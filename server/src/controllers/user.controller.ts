import { generateToken } from "../config/generateToken.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {
    GenericResponse,
    signupRequest,
    signupResponse,
} from "../shared/type.js";
import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export const registerUser = async (req: Request, res: Response) => {
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
            return {
                success: false,
                data: null,
                message:
                    "User already registered with this email or phone number",
            };
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
        const result = await UserService.registerUser(user);

        // res.status(201).json({
        //     message: "User registered successfully",
        //     userId: user._id,
        //     token: generateToken(user._id),
        //     user: {
        //         fullName,
        //         email,
        //         phoneNumber,
        //         gender,
        //         dateOfBirth,
        //         profilePicture,
        //         profession,
        //         city,
        //         state,
        //         isPremium: false,
        //     },
        // });
        res.status(result.success ? 201 : 404).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};

export async function signupUser(
    request: Request,
    response: Response
): Promise<void> {
    try {
        const {
            fullName,
            city,
            dateOfBirth,
            email,
            gender,
            password,
            phoneNumber,
            profession,
            profilePicture,
            state,
        }: signupRequest = request.body;

        const findUserByEmail = await User.findOne({ email });
        const findUserByPhoneNumber = await User.findOne({ phoneNumber });

        if (findUserByEmail || findUserByPhoneNumber) {
            const errorResponse: GenericResponse<null> = {
                success: false,
                data: null,
                message: "User already exists with this email or phone number",
            };

            response.status(400).json(errorResponse);
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

        // For success case
        const successResponse: GenericResponse<signupResponse> = {
            success: true,
            data: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                profilePicture: user.profilePicture,
                profession: user.profession,
                city: user.city,
                state: user.state,
                token: generateToken(user._id),
            },
            message: "User registered successfully",
        };
        response.status(201).json(successResponse);
    } catch (error) {
        const errorResponse: GenericResponse<null> = {
            success: false,
            data: null,
            message: "Error registering user",
        };
        response.status(500).json(errorResponse);
    }
}

// Login User
export const loginUser = async (req: Request, res: Response) => {
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
export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    const loggedInUser = req.user;

    try {
        const users = await User.find({});
        const filteredUser = users.filter(
            (user) => user.id !== loggedInUser._id
        );

        res.status(200).json({
            message: "All users fetched successfully",
            data: filteredUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};

// Get Filtered Users
export const getFilteredUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
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
        res.status(500).json({
            message: "Error fetching filtered users",
            error: error.message,
        });
    }
};

export const getUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user profile",
            error: error.message,
        });
    }
};

export const updateUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: req.body }, //// Request mein jo bhi data aaye, sirf wahi update hoga
            { new: true, runValidators: true } // new: true return updated document, runValidators: true validate data
        ).select("-password");

        if (!updateUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Plain JavaScript object mein convert karna
        const userObject = updateUser.toObject();
        userObject.dateOfBirth = userObject.dateOfBirth
            .toISOString()
            .split("T")[0]; // Format date

        res.status(200).json({
            message: "profile updated successfully",
            user: userObject,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
};

export const saveFCMToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { fcmToken } = req.body;
        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, { fcmToken });
        res.status(200).json({ message: "FCM token saved successfully" });
    } catch (error) {
        console.error("Error saving FCM token:", error);
        res.status(500).json({
            message: "Error saving FCM token",
            error: error.message,
        });
    }
};
