import { User } from "../db/model.js";
import bcryptjs from "bcryptjs";

export const authFns = {
  sessionCheck: async (req, res) => {
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

    const passwordHash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

    const newUser = await User.create({
      firstName: fname,
      lastName: lname,
      userName: username,
      password: password, // change value to passwordHash once ready for encryption
    });

    if (!newUser) {
      return res.send({
        message: "Registration failed",
        success: false,
      });
    }

    req.session.userId = newUser.userId;

    return res.send({
      message: "User registered successfully",
      success: true,
      userId: req.session.userId,
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;

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

    // Use prior to encrypting passwords in db
    if (password !== user.password) {
      return res.send({
        message: "Password is incorrect",
        success: false,
      });
    }
    // Use once seed data passwords are encrypted
    // if(!bcryptjs.compareSync(password, user.password)) {
    //   return res.send({
    //     message: 'Password is incorrect',
    //     success: false
    //   });
    // };

    req.session.userId = user.userId;

    return res.send({
      message: "User logged in successfully",
      success: true,
      userId: req.session.userId,
    });
  },

  logout: async (req, res) => {},
};
