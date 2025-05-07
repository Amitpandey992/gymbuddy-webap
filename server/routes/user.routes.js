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
router.get("/test", (req, res) => res.send("User route works"));

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

//user profile
router.get("/profile", verifiedUser, getUserProfile);

//update user profile
router.patch("/profile", verifiedUser, updateUserProfile);

// Get all users
router.get("/allusers", verifiedUser, getAllUsers);

// Get users with filters
router.get("/search", verifiedUser, getFilteredUsers);

export default router;
