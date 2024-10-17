import {
  User,
  UserRecipe,
  Recipe,
  RecipeIngredient,
  Ingredient,
  MeasurementQuantity,
  MeasurementUnit,
} from "../backend/db/model.js";

const getUserRecipes = async (userId) => {
  try {
    const userRecipes = await User.findByPk(userId, {
      attributes: ["userId"],
      separate: true,
      include: [
        {
          model: UserRecipe,
          separate: true,
          include: [
            {
              model: Recipe,
              include: [
                {
                  model: RecipeIngredient,
                  include: [Ingredient, MeasurementQuantity, MeasurementUnit],
                },
              ],
            },
          ],
        },
      ],
    });

    return { success: true, userRecipes: userRecipes.userRecipes };
  } catch (error) {
    console.error(error);

    return {
      message: `Error when getting userRecipes from db`,
      success: false,
    };
  }
};

export default getUserRecipes;
