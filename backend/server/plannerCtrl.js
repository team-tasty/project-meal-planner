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
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: `Error when trying to get week data by weekId`,
      });
    }
  },

  addUserWeek: async (req, res) => {
    // TODO: ensure frontend prevents add if user already has 4 weeks
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

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
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Failed to create new week for user in db",
        success: false,
      });
    }
  },

  deleteUserWeek: async (req, res) => {
    // TODO: ensure frontend prevents delete if user only has 1 week
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId } = req.params;

    try {
      await WeekMeal.destroy({
        where: {
          weekId,
        },
      });

      const weekToDelete = await Week.findByPk(weekId);

      await weekToDelete.destroy();

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully deleted week in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Failed to delete week from db",
        success: false,
      });
    }
  },

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
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Error when creating new weekMeal in db",
        success: false,
      });
    }
  },

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
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Error when updating weekMeal in db",
        success: false,
      });
    }
  },

  deleteWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekMealId } = req.params;

    try {
      const weekMealToDelete = await WeekMeal.findByPk(weekMealId);

      await weekMealToDelete.destroy();

      const resObj = await getUserWeeks(userId);

      if (resObj.success) {
        resObj.message = `Successfully deleted weekMeal in db`;
      }

      return res.send(resObj);
    } catch (error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Error when deleting weekMeal from db",
        success: false,
      });
    }
  },

  resetWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId } = req.params;

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
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: "Error when resetting week in db",
        success: false,
      });
    }
  },
};
