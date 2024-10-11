import axios from "axios";
import { Ingredient, MeasurementQuantity, MeasurementUnit, Recipe, RecipeIngredient, User } from "../db/model.js";
import convertIngredient from "../../functions/parseIngredient.js";

export const recipeFns = {
  recipeSearch: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    // For use when allowing user to search by ingredient, category, or area in addition to recipe title (Work in Progress)
    // const { searchInput, searchType } = req.body;

    // const searchParams = new URLSearchParams({ [searchType]: searchInput }).toString();

    // let searchRes;

    // if (searchType === 's') {
    //   searchRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?${searchParams}`);
    // } else if (searchType === 'i' || searchType === 'c' || searchType === 'a') {
    //   searchRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${searchParams}`);
    // }
    
    // For use when only doing recipe title search
    const { searchInput } = req.body;

    const searchParams = new URLSearchParams({ s: searchInput }).toString();

    const searchRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?${searchParams}`);

    if (!searchRes.data) {
      return res.send({
        message: 'Could not get data from external API',
        success: false
      });
    };

    if (!searchRes.data.meals) {
      return res.send({
        message: 'No results found',
        success: false
      });
    };

    const recipesData = [];
    
    try {
      for (const meal of searchRes.data.meals) {
        let recipeObj = {};
        
        recipeObj.recipeId = meal.idMeal; // should this be named something other than 'recipeId' to avoid conflicts if user recipes and external recipes are displayed at the same time?
        recipeObj.title = meal.strMeal;
        recipeObj.instruction = meal.strInstructions;
        recipeObj.image = meal.strMealThumb;
        recipeObj.category = meal.strCategory;
        recipeObj.area = meal.strArea;
        recipeObj.tag = meal.strTags;
        recipeObj.recipeIngredients = [];
  
        // Recipe Ingredients loop
        for (let i = 1; i <= 20; i++) {
          if (!meal[`strIngredient${i}`]) {
            break
          };
          
          const recipeIngredientObj = {};
  
          const qtyUnitArr = convertIngredient(meal[`strMeasure${i}`]);

          // console.log(`qtyUnitArr:`, qtyUnitArr);
  
          recipeIngredientObj.measurementQuantity = { quantity: qtyUnitArr[0] };
          recipeIngredientObj.measurementUnit = { unit: qtyUnitArr[1] };
          recipeIngredientObj.ingredient = { ingredient: meal[`strIngredient${i}`].toLowerCase() };
  
          recipeObj.recipeIngredients.push(recipeIngredientObj);
        };
  
        recipesData.push(recipeObj);
      };
    } catch(error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: 'Could not parse and manipulate data from external API',
        success: false
      });
    };

    return res.send({
      message: 'Successfully retrieved, parsed, and manipulated data from external API',
      success: true,
      recipesData: recipesData,
    });
  },

  saveRecipe: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };

    const { recipeObj } = req.body;

    // See if external recipe is already stored in local db (search local db for recipes with 'externalRecipeId' equal to recipeObj.recipeId)
    const existingRecipe = await Recipe.findAll({
      where: {
        externalRecipeId: recipeObj.recipeId
      }
    })

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
          tag: recipeObj.tag
        });
      } catch(error) {
        console.log();
        console.error(error);
        console.log();

        return res.send({
          message: 'Failed to create new recipe in db',
          success: false
        });
      };

      for (const recipeIngredient of recipeObj.recipeIngredients) {
        try {
          newIngredientName = await Ingredient.create({
            ingredient: recipeIngredient.ingredient
          });

          newQuantity = await MeasurementQuantity.create({
            quantity: recipeIngredient.quantity
          });

          newUnit = await MeasurementUnit.create({
            unit: recipeIngredient.unit
          });
        } catch(error) {
          console.log();
          console.error(error);
          console.log();
  
          return res.send({
            message: 'Failed to create new ingredient name, quantity, and/or unit in db',
            success: false
          })
        }

        try {
          newRecipeIngredient = RecipeIngredient.build();

          newRecipeIngredient.addIngredient(newIngredientName);
          newRecipeIngredient.addMeasurementQuantity(newQuantity);
          newRecipeIngredient.addMeasurementUnit(newUnit);

          newRecipeIngredient.addRecipe(newRecipe);

          await newRecipeIngredient.save();

        } catch(error) {
          console.log();
          console.error(error);
          console.log();
          return res.send({
            message: 'Failed to create new recipeIngredient in db',
            success: false
          });
        };
      };
    };

    // Once recipe is in local db, or if recipe is already in local db, create new userRecipe
  }
}