import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  getFilteredUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifiedUser } from "../middlewares/verified.js";

const router = express.Router();

// Register a new user
router.post("/api/users/register", registerUser);

// Login user
router.post("/api/users/login", loginUser);

//user profile
router.get("/api/users/profile", verifiedUser, getUserProfile);

//update user profile
router.patch("/api/users/profile", verifiedUser, updateUserProfile);

// Get all users
router.get("/api/users", verifiedUser, getAllUsers);

// Get users with filters
router.get("/api/users/search", getFilteredUsers);

export default router;
