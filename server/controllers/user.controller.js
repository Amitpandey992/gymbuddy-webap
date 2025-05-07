import mongoose from "mongoose";
import { generateToken } from "../config/generateToken.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Register a New User
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      profilePicture,
      profession,
      city,
      state,
    } = req.body;

    const findUserByEmail = await User.findOne({ email });
    const findUserByPhoneNumber = await User.findOne({ phoneNumber });

    if (findUserByEmail || findUserByPhoneNumber) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashPassword,
      phoneNumber,
      gender,
      dateOfBirth,
      profilePicture,
      profession,
      city,
      state,
      isPremium: false,
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      token: generateToken(user._id),
      user: {
        fullName,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        profilePicture,
        profession,
        city,
        state,
        isPremium: false,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  const loggedInUser = req.user;
  
  try {
    const users = await User.find({});
    const filteredUser = users.filter((user) => user.id !== loggedInUser._id);

    res
      .status(200)
      .json({ message: "All users fetched successfully", data: filteredUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get Filtered Users
export const getFilteredUsers = async (req, res) => {
  try {
    const { minAge, maxAge, city, state } = req.query; // URL query parameters ko destructure kar rahe hain
    let filters = {}; // Filters object banaya gaya hai jo query ke hisaab se update hoga

    // Location filters
    if (city) filters.city = city; // Agar query mein city di gayi hai, toh filters mein city ko add karte hain
    if (state) filters.state = state; // Agar state di gayi hai, toh filters mein state ko add karte hain

    // Age filtering (dateOfBirth ke base par)
    if (minAge || maxAge) {
      const currentYear = new Date().getFullYear(); // Current year nikalte hain

      if (minAge) {
        // Minimum age ke hisaab se maximum birth date nikal rahe hain
        filters.dateOfBirth = {
          ...filters.dateOfBirth,
          $lte: new Date(`${currentYear - minAge}-12-31`),
        };
      }
      if (maxAge) {
        // Maximum age ke hisaab se minimum birth date nikal rahe hain
        filters.dateOfBirth = {
          ...filters.dateOfBirth,
          $gte: new Date(`${currentYear - maxAge}-01-01`),
        };
      }
    }

    // MongoDB query lagayi with filters
    const users = await User.find(filters); // Filters ko `User.find()` ke saath pass karte hain

    // Success response mein filtered users bheje
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching filtered users", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body }, //// Request mein jo bhi data aaye, sirf wahi update hoga
      { new: true, runValidators: true } // new: true return updated document, runValidators: true validate data
    ).select("-password");

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Plain JavaScript object mein convert karna
    const userObject = updateUser.toObject();
    userObject.dateOfBirth = userObject.dateOfBirth.toISOString().split("T")[0]; // Format date

    res.status(200).json({
      message: "profile updated successfully",
      user: userObject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
