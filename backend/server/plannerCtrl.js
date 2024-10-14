import axios from "axios";
import { User, Week, Day, Recipe, WeekMeal } from "../db/model.js";

export const plannerFns = {
  userWeeks: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const userWeeks = await User.findByPk(userId, {
      attributes: ["userId"],
      include: [
        {
          model: Week,
          include: [
            {
              model: WeekMeal,
              include: [Day, Recipe],
            },
          ],
        },
      ],
    });

    if (userWeeks.weeks.length === 0) {
      return res.send({
        message: "Failed to get user weeks",
        success: false,
      });
    }

    return res.send({
      message: `Successfully got user's weeks`,
      success: true,
      userWeeks: userWeeks.weeks,
    });
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

      const updatedUserWeeks = await User.findByPk(userId, {
        attributes: ["userId"],
        include: [
          {
            model: Week,
            include: [
              {
                model: WeekMeal,
                include: [Day, Recipe],
              },
            ],
          },
        ],
      });

      if (updatedUserWeeks.weeks.length === 0) {
        return res.send({
          message: "Failed to get updated user weeks",
          success: false,
        });
      }

      return res.send({
        message: "Successfully created new week for user in db",
        success: true,
        updatedUserWeeks: updatedUserWeeks.weeks,
      });
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
      const weekToDelete = await Week.findByPk(weekId);

      await weekToDelete.destroy();

      const updatedUserWeeks = await User.findByPk(userId, {
        attributes: ["userId"],
        include: [
          {
            model: Week,
            include: [
              {
                model: WeekMeal,
                include: [Day, Recipe],
              },
            ],
          },
        ],
      });

      if (updatedUserWeeks.weeks.length === 0) {
        return res.send({
          message: "Failed to get updated user weeks",
          success: false,
        });
      }

      return res.send({
        message: "Successfully deleted week in db",
        success: true,
        updatedUserWeeks: updatedUserWeeks.weeks,
      });
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

  // TODO: create reset week controller function

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

  createWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    const { weekId, dayId, recipeId } = req.body;

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

      const updatedUserWeeks = await User.findByPk(userId, {
        attributes: ["userId"],
        include: [
          {
            model: Week,
            include: [
              {
                model: WeekMeal,
                include: [Day, Recipe],
              },
            ],
          },
        ],
      });

      if (updatedUserWeeks.weeks.length === 0) {
        return res.send({
          message: "Failed to get updated user weeks",
          success: false,
        });
      }

      return res.send({
        message: "Successfully created new weekMeal in db",
        success: true,
        updatedUserWeeks: updatedUserWeeks.weeks,
      });
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

      weekMealToUpdate.update({
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

      const updatedUserWeeks = await User.findByPk(userId, {
        attributes: ["userId"],
        include: [
          {
            model: Week,
            include: [
              {
                model: WeekMeal,
                include: [Day, Recipe],
              },
            ],
          },
        ],
      });

      if (updatedUserWeeks.weeks.length === 0) {
        return res.send({
          message: "Failed to get updated user weeks",
          success: false,
        });
      }

      return res.send({
        message: "Successfully updated weekMeal in db",
        success: true,
        updatedUserWeeks: updatedUserWeeks.weeks,
      });
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

      console.log(weekMealToDelete.destroy());

      const updatedUserWeeks = await User.findByPk(userId, {
        attributes: ["userId"],
        include: [
          {
            model: Week,
            include: [
              {
                model: WeekMeal,
                include: [Day, Recipe],
              },
            ],
          },
        ],
      });

      if (updatedUserWeeks.weeks.length === 0) {
        return res.send({
          message: "Failed to get updated user weeks",
          success: false,
        });
      }

      return res.send({
        message: "Successfully deleted weekMeal in db",
        success: true,
        updatedUserWeeks: updatedUserWeeks.weeks,
      });
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
};
