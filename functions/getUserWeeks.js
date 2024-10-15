import {
  Day,
  Ingredient,
  MeasurementQuantity,
  MeasurementUnit,
  Recipe,
  RecipeIngredient,
  User,
  Week,
  WeekMeal,
} from "../backend/db/model.js";

const getUserWeeks = async (userId) => {
  const userWeeks = await User.findByPk(userId, {
    attributes: ["userId"],
    include: [
      {
        model: Week,
        include: [
          {
            model: WeekMeal,
            include: [
              Day,
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
      },
    ],
  });

  if (userWeeks.weeks === 0) {
    return {
      message: "Failed to get user weeks",
      success: false,
    };
  }

  return {
    // message: `Successfully got user weeks`,
    success: true,
    userWeeks: userWeeks.weeks,
  };
};

export default getUserWeeks;

console.log(`user weeks for userId 1:`, await getUserWeeks(1))
