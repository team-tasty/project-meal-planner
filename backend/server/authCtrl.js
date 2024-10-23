import { User, Week } from "../db/model.js";
import bcryptjs from "bcryptjs";

export const authFns = {
  sessionCheck: async (req, res) => {
    // Check if there is a user in the session
    if (req.session.userId) {
      return res.send({
        message: "User is in session",
        success: true,
        userId: req.session.userId,
      });
    } else {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }
  },

  register: async (req, res) => {
    const { fname, lname, username, password } = req.body;

    // Check if the username is already taken
    const user = await User.findOne({
      where: {
        userName: username,
      },
    });

    if (user) {
      return res.send({
        message: "Username already exists",
        success: false,
      });
    }

    // Hash the password
    const passwordHash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

    // Create new user
    const newUser = await User.create({
      firstName: fname,
      lastName: lname,
      userName: username,
      password: passwordHash,
    });

    // Ensure user was created in db
    if (!newUser) {
      return res.send({
        message: "Registration failed",
        success: false,
      });
    }

    // Save userId to session
    req.session.userId = newUser.userId;

    try {
      // Create a new week so weekly planner will have a week starting out
      const newWeek = await Week.create({
        userId: newUser.userId,
      });

      // Ensure new week was created in db
      if (!newWeek) {
        return res.send({
          message: `Failed to create new week for new user`,
          success: false,
        });
      }
    } catch (error) {
      console.error(error);

      return res.send({
        message: `Error when creating new week for new user`,
        success: false,
      });
    }

    return res.send({
      message: "User registered successfully",
      success: true,
      userId: req.session.userId,
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists with that username
    const user = await User.findOne({
      where: {
        userName: username,
      },
    });

    if (!user) {
      return res.send({
        message: "User not found",
        success: false,
      });
    }

    // Compare user input password with saved password hash
    if (!bcryptjs.compareSync(password, user.password)) {
      return res.send({
        message: "Password is incorrect",
        success: false,
      });
    }

    // Save userId to session
    req.session.userId = user.userId;

    return res.send({
      message: "User logged in successfully",
      success: true,
      userId: req.session.userId,
    });
  },

  logout: async (req, res) => {
    if (!req.session.userId) {
      return res.send({
        message: "No user in session",
        success: false,
      });
    }

    req.session.destroy();

    return res.send({
      message: "User logged out successfully",
      success: true,
    });
  },
};
