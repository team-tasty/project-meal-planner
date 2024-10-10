import axios from "axios";
import { User } from "../db/model.js";
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

    const { searchInput } = req.body;

    const searchRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);

    if (!searchRes.data) {
      return res.send({
        message: 'Could not get data from external API',
        success: false
      });
    };

    const recipeData = [];
    
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
          const recipeIngredientObj = {};
  
          const qtyUnitArr = convertIngredient(meal[`strMeasure${i}`]);
  
          recipeIngredientObj.measurementQuantity = { quantity: qtyUnitArr[0] };
          recipeIngredientObj.measurementUnit = { unit: qtyUnitArr[1] };
          recipeIngredientObj.ingredient = { ingredient: meal[`strIngredient${i}`].toLowerCase() };
  
          recipeObj.recipeIngredients.push(recipeIngredientObj);
        };
  
        recipeData.push(recipeObj);
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
      message: 'Successfully retreived, parsed, and manipulated data from external API',
      success: true,
      recipeData: recipeData,
    });
  }
}