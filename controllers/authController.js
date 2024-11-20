import passport from "passport";
import dotenv from "dotenv";
import generateToken from "../config/generateToken.js";
import User from "../models/User.js";
dotenv.config();

const signUp = async (req, res, next) => {
  passport.authenticate("signup", async (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: "Sign up failed" });
    }

    return res.status(201).json({
      message: "Signed up sucessfully. Login",
      user,
    });
  })(req, res, next);
};

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: info.message || "Invalid credentials" });
    }

    try {
      req.login(user, { session: false }, async (err) => {
        if (err) {
          return res.status(400).json({ error: "Error while logging in" });
        }

        const token = generateToken(user);

        return res.status(201).json({
          success: true,
          message: "Login successful",
          token,
        });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res.status(200).json({ success: "Logout sucessful" });
  });
};

export default {
  signUp,
  login,
  logout,
};
