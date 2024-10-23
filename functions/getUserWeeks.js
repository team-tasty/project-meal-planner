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
  // Get all data related to user's planner weeks
  try {
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
                      include: [
                        Ingredient,
                        MeasurementQuantity,
                        MeasurementUnit,
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Return object to be used as response object (Message will be added by controller function)
    return {
      success: true,
      userWeeks: userWeeks.weeks,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Failed to get user weeks",
      success: false,
    };
  }
};

export default getUserWeeks;
