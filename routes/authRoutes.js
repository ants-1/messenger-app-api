import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", authController.signUp);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

export default router;
