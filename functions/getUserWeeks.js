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

const getUserWeeks = async (userId, weekId) => {
  const userWeeks = await User.findByPk(userId, {
    attributes: ["userId"],
    separate: true,
    include: [
      {
        model: Week,
        separate: true,
        where: weekId ? { weekId } : {},
        include: [
          {
            model: WeekMeal,
            separate: true,
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
    // message to be included in controller function
    success: true,
    userWeeks: userWeeks.weeks,
  };
};

export default getUserWeeks;
