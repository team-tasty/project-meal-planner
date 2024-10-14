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
      userWeeks,
    });
  },

  addUserWeek: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
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
  },

  days: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }
  },

  createWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
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
  },

  deleteWeekMeal: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }
  },
};
