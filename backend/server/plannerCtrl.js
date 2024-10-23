import axios from "axios";
import {
  User,
  Week,
  Day,
  Recipe,
  WeekMeal,
  RecipeIngredient,
  Ingredient,
  MeasurementQuantity,
  MeasurementUnit,
} from "../db/model.js";
import getUserWeeks from "../../functions/getUserWeeks.js";

export const plannerFns = {
  // Gets all data for user weeks on planner page
  userWeeks: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const resObj = await getUserWeeks(userId);

    if (resObj.success) {
      resObj.message = `Successfully got user weeks`;
    }

    return res.send(resObj);
  },

  // Gets single week data
  singleWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: `No user in session`,
        success: false,
      });
    }

    const { weekId } = req.body;

    try {
      const resObj = await getUserWeeks(userId, weekId);

      if (resObj.success) {
        resObj.message = `Successfully got week data by weekId`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: `Error when trying to get week data by weekId`,
      });
    }
  },

  addUserWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    // Create a week and get user weeks data to send back in response
    try {
      await Week.create({
        userId,
      });

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully created new week for user in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Failed to create new week for user in db",
        success: false,
      });
    }
  },

  deleteUserWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId } = req.params;

    try {
      // Delete all WeekMeals associated with the week to be deleted
      await WeekMeal.destroy({
        where: {
          weekId,
        },
      });

      // Delete week
      const weekToDelete = await Week.findByPk(weekId);

      await weekToDelete.destroy();

      // Get user weeks data for response
      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully deleted week in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Failed to delete week from db",
        success: false,
      });
    }
  },

  // Sends name of each day in db. (So that we can easily change names from "Day 1", "Day 2", etc. to "Monday", "Tuesday", etc.)
  days: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const days = await Day.findAll();

    if (days.length === 0) {
      return res.send({
        message: "Failed to get days of the week from db",
        success: false,
      });
    }

    return res.send({
      message: "Successfully got days of the week",
      success: true,
      days,
    });
  },

  // Adds recipe to planner DayDrop
  addWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId, dayId, recipeId } = req.body;

    if (!weekId || !dayId || !recipeId) {
      return res.send({
        message: `Body object variables are null or undefined`,
        success: false,
      });
    }

    // Create new WeekMeal and get weeks data to send in response
    try {
      const newWeekMeal = await WeekMeal.create({
        weekId,
        dayId,
        recipeId,
      });

      if (!newWeekMeal) {
        return res.send({
          message: "Failed to create new weekMeal in db",
          success: false,
        });
      }

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully created new weekMeal in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Error when creating new weekMeal in db",
        success: false,
      });
    }
  },

  // For moving a saved recipe in planner from one DayDrop to another, or to a different week (not used in initial version, possibly implemented later)
  editWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekMealId, weekId, dayId, recipeId } = req.body;

    try {
      const weekMealToUpdate = await WeekMeal.findByPk(weekMealId);

      await weekMealToUpdate.update({
        weekId,
        dayId,
        recipeId,
      });

      if (!weekMealToUpdate) {
        return res.send({
          message: "Failed to update weekMeal in db",
          success: false,
        });
      }

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully updated weekMeal in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Error when updating weekMeal in db",
        success: false,
      });
    }
  },

  // Removes recipe from planner DayDrop
  deleteWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekMealId } = req.params;

    // Delete WeekMeal and get user weeks data to send in response
    try {
      const weekMealToDelete = await WeekMeal.findByPk(weekMealId);

      await weekMealToDelete.destroy();

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully deleted weekMeal in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Error when deleting weekMeal from db",
        success: false,
      });
    }
  },

  // Removes all WeekMeals from Week (removes all recipes from DayDrop of that week)
  resetWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId } = req.params;

    // Delete WeekMeals of that weekId and get user weeks data to send in response
    try {
      await WeekMeal.destroy({
        where: {
          weekId,
        },
      });

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully reset week in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.error(error);

      return res.send({
        message: "Error when resetting week in db",
        success: false,
      });
    }
  },
};
