import express from "express";
import {
    getAllUsers,
    loginUser,
    registerUser,
    getFilteredUsers,
    getUserProfile,
    updateUserProfile,
    saveFCMToken,
} from "../controllers/user.controller.js";
import { verifiedUser } from "./../middlewares/verified";

const router = express.Router();

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

// Save FCM token
router.post("/save-fcm-token", verifiedUser, saveFCMToken);

export default router;
