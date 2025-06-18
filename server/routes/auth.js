import express from "express";
import {
  registerUser,
  loginUser,
  verify,
} from "../controllers/authController.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

router.post("/verify", verify);

// Export the router
export default router;
