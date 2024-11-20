import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
  const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;

  const { _id, username } = user;
  return jwt.sign(
    {
      user: {
        _id,
        username,
      },
    },
    TOKEN_SECRET_KEY,
    { expiresIn: TOKEN_EXPIRE_TIME }
  );
};

export default generateToken;
