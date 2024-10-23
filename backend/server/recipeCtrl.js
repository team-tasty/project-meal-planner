import axios from "axios";
import {
  Ingredient,
  MeasurementQuantity,
  MeasurementUnit,
  Recipe,
  RecipeIngredient,
  User,
  UserRecipe,
} from "../db/model.js";
import convertIngredient from "../../functions/parseIngredient.js";
import getExternalIds from "../../functions/getExternalIds.js";
import getUserRecipes from "../../functions/getUserRecipes.js";

export const recipeFns = {
  recipeSearch: async (req, res) => {
    // Check if user is in session
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { searchInput } = req.body;

    // Format user search input to search params
    const searchParams = new URLSearchParams({ s: searchInput }).toString();

    // Make call to TheMealDB
    const searchRes = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?${searchParams}`
    );

    // Ensure that the call worked
    if (!searchRes.data) {
      return res.send({
        message: "Could not get data from external API",
        success: false,
      });
    }

    // if no results, send success is false.
    // (It might be better to still send success to the frontend even if there are no search results and have the front end conditionally display "no results".)
    if (!searchRes.data.meals) {
      return res.send({
        message: "No results found",
        success: false,
      });
    }

    // Restructure TheMealDB API response data to be formatted like a sequelize query from our db so that RecipeCard component can be generated from both our db and the external API
    const recipesData = [];

    try {
      for (const meal of searchRes.data.meals) {
        // Initialize a recipe object and add properties to it
        let recipeObj = {};

        recipeObj.recipeId = meal.idMeal;
        recipeObj.title = meal.strMeal;
        recipeObj.instruction = meal.strInstructions;
        recipeObj.image = meal.strMealThumb;
        recipeObj.category = meal.strCategory;
        recipeObj.area = meal.strArea;
        recipeObj.tag = meal.strTags;
        recipeObj.recipeIngredients = [];

        // Recipe Ingredients loop
        for (let i = 1; i <= 20; i++) {
          // Each TheMealDB recipes have 20 properties spaces for ingredients, but some come back empty when the recipe has less than 20
          // Break the loop if an ingredient space is empty 
          if (!meal[`strIngredient${i}`]) {
            break;
          }

          const recipeIngredientObj = {};

          // Use Tyler's function to get an array with quantity and unit from strMeasure in TheMealDB recipe
          const qtyUnitArr = convertIngredient(meal[`strMeasure${i}`]);

          recipeIngredientObj.measurementQuantity = { quantity: qtyUnitArr[0] };
          recipeIngredientObj.measurementUnit = { unit: qtyUnitArr[1] };
          recipeIngredientObj.ingredient = {
            ingredient: meal[`strIngredient${i}`].toLowerCase(),
          };

          // Add recipe ingredient object to recipe object
          recipeObj.recipeIngredients.push(recipeIngredientObj);
        }

        // Add recipe to recipeData array to send to frontend
        recipesData.push(recipeObj);
      }
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Could not parse and manipulate data from external API",
        success: false,
      });
    }

    return res.send({
      message:
        "Successfully retrieved, parsed, and manipulated data from external API",
      success: true,
      recipesData: recipesData,
    });
  },

  saveRecipe: async (req, res) => {
    // Check if user is in session
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { recipeObj } = req.body;

    // See if external recipe is already stored in local db (search local db for recipes with 'externalRecipeId' equal to recipeObj.recipeId)
    const existingRecipe = await Recipe.findOne({
      where: {
        externalRecipeId: recipeObj.recipeId,
      },
    });

    // If recipe is not in local db, then create new 'recipe', 'ingredient', 'unit', 'quantity', and 'recipe ingredient' for each recipe and ingredient
    if (!existingRecipe) {
      let newRecipe;
      let newRecipeIngredient;
      let newIngredientName;
      let newQuantity;
      let newUnit;

      try {
        newRecipe = await Recipe.create({
          externalRecipeId: recipeObj.recipeId,
          title: recipeObj.title,
          image: recipeObj.image,
          instruction: recipeObj.instruction,
          category: recipeObj.category,
          area: recipeObj.area,
          tag: recipeObj.tag,
        });
      } catch (error) {
        console.error(error);

        return res.send({
          message: "Failed to create new recipe in db",
          success: false,
        });
      }

      for (const recipeIngredient of recipeObj.recipeIngredients) {
        try {
          newIngredientName = await Ingredient.create({
            ingredient: recipeIngredient.ingredient.ingredient,
          });

          newQuantity = await MeasurementQuantity.create({
            quantity: recipeIngredient.measurementQuantity.quantity,
          });

          newUnit = await MeasurementUnit.create({
            unit: recipeIngredient.measurementUnit.unit,
          });
        } catch (error) {
          console.error(error);

          return res.send({
            message:
              "Failed to create new ingredient name, quantity, and/or unit in db",
            success: false,
          });
        }

        try {
          newRecipeIngredient = await RecipeIngredient.create();

          newRecipeIngredient.setIngredient(newIngredientName);
          newRecipeIngredient.setMeasurementQuantity(newQuantity);
          newRecipeIngredient.setMeasurementUnit(newUnit);

          newRecipeIngredient.setRecipe(newRecipe);
        } catch (error) {
          console.error(error);

          return res.send({
            message: "Failed to create new recipeIngredient in db",
            success: false,
          });
        }
      }
    }

    // Now that the recipe is in our db (whether it was already in our db, or it was just added),
    // find that recipe and use it to create new UserRecipe
    const recipeToAdd = await Recipe.findOne({
      where: {
        externalRecipeId: recipeObj.recipeId,
      },
    });

    const newUserRecipe = await UserRecipe.create({
      userId,
      recipeId: recipeToAdd.recipeId,
    });

    if (!newUserRecipe) {
      return res.send({
        message: "Failed to create new userRecipe in db",
        success: false,
      });
    }

    // Get external recipe ids to send to frontend for saved status of recipe cards
    try {
      const resObj = await getExternalIds(userId);

      if (resObj.success) {
        resObj.message = `Successfully created userRecipe in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: `Error when trying to get external ids`,
        success: false,
      });
    }
  },

  unsaveRecipe: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { userRecipeId } = req.params;

    // Delete user recipe from db
    try {
      const userRecipeToDelete = await UserRecipe.findByPk(userRecipeId);

      await userRecipeToDelete.destroy();

    // Get external recipe ids to send to frontend for saved status of recipe cards
    try {
        const resObj = await getExternalIds(userId);
  
        if (resObj.success) {
          resObj.message = `Successfully deleted userRecipe from db`;
        }
  
        return res.send(resObj);
      } catch (error) {
        console.error(error);
  
        return res.send({
          message: `Error when trying to get external ids`,
          success: false,
        });
      }
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Failed to delete userRecipe from db",
        success: false,
      });
    }
  },

  // Gets user's saved recipes to display cards in weekly planner
  userRecipes: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const resObj = await getUserRecipes(userId);

    if (resObj.success) {
      resObj.message = `Successfully got userRecipes from db`;
    }
    return res.send(resObj);
  },

  // Get external recipe ids to send to frontend for saved status of recipe cards
  externalRecipeIds: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const resObj = await getExternalIds(userId);

    if (resObj.success) {
      resObj.message = `Successfully got external recipe Ids from db`;
    }

    return res.send(resObj);
  },

  // Adds user's personal recipe to database and creates new UserRecipe
  createRecipe: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: `No user in session`,
        success: false,
      });
    }

    const { recipeObj } = req.body;

    let newRecipe;
    let newRecipeIngredient;
    let newIngredientName;
    let newQuantity;
    let newUnit;

    try {
      newRecipe = await Recipe.create({
        title: recipeObj.title,
        image: recipeObj.image,
        instruction: recipeObj.instruction,
        category: recipeObj.category,
        area: recipeObj.area,
        tag: recipeObj.tag,
      });
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Failed to create new recipe in db",
        success: false,
      });
    }

    for (const recipeIngredient of recipeObj.recipeIngredients) {
      try {
        newIngredientName = await Ingredient.create({
          ingredient: recipeIngredient.ingredient.ingredient,
        });

        newQuantity = await MeasurementQuantity.create({
          quantity: recipeIngredient.measurementQuantity.quantity,
        });

        newUnit = await MeasurementUnit.create({
          unit: recipeIngredient.measurementUnit.unit,
        });
      } catch (error) {
        console.error(error);

        return res.send({
          message:
            "Failed to create new ingredient name, quantity, and/or unit in db",
          success: false,
        });
      }

      try {
        newRecipeIngredient = await RecipeIngredient.create();

        newRecipeIngredient.setIngredient(newIngredientName);
        newRecipeIngredient.setMeasurementQuantity(newQuantity);
        newRecipeIngredient.setMeasurementUnit(newUnit);

        newRecipeIngredient.setRecipe(newRecipe);
      } catch (error) {
        console.error(error);

        return res.send({
          message: "Failed to create new recipeIngredient in db",
          success: false,
        });
      }
    }

    const newUserRecipe = await UserRecipe.create({
      userId,
      recipeId: newRecipe.recipeId,
    });

    if (!newUserRecipe) {
      return res.send({
        message: `Failed to create new userRecipe`,
        success: false,
      });
    }

    return res.send({
      message: `Successfully added new recipe to db`,
      success: true,
    });
  },
};
