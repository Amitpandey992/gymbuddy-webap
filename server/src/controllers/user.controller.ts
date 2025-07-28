import User from "../models/user.model.js";
import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
    static async loginUser(req: Request, res: Response): Promise<void> {
        const result = await UserService.loginUser(
            req.body.email,
            req.body.password
        );
        res.status(result.success ? 200 : 404).json(result);
    }

    static async sendOtp(req: Request, res: Response) {
        const { email } = req.body;
        const result = await UserService.sendOtpForVerification(email);
        res.status(result.success ? 200 : 404).json(result);
    }

    static async verifyOtp(req: Request, res: Response) {
        const { email, otp } = req.body;
        const result = await UserService.verifyOtp(email, otp);
        res.status(result.success ? 200 : 404).json(result);
    }

    static async userRegistrationWithNamePassword(req: Request, res: Response) {
        const { fullName, password } = req.body;

        const authHeader = req.headers.authorization as string;
        const token = authHeader?.replace("Bearer ", "");

        const result = await UserService.registerUserWithUserNameAndPassword(
            {
                fullName,
                password,
            },
            token
        );

        res.status(result.success ? 200 : 400).json(result);
    }

    static async completeProfileRegistration(req: Request, res: Response) {
        const authHeader = req.headers.authorization as string;
        const token = authHeader?.replace("Bearer ", "");
        
        
        const uploadedFile = req.file;
        
        const result = await UserService.completeUserRegistration(
            {
                ...req.body,
                profilePicture: uploadedFile ? uploadedFile.path : req.body.profilePicture
            },
            token
        );
        
       
        if (!result.success && uploadedFile) {
            const fs = require('fs');
            try {
                fs.unlinkSync(uploadedFile.path);
                console.log('Uploaded file deleted due to registration failure');
            } catch (error) {
                console.error('Error deleting uploaded file:', error);
            }
        }
        
        res.status(result.success ? 200 : 404).json(result);
    }

    static async getAllCoUsers(req: Request, res: Response): Promise<void> {
        const result = await UserService.getAllCoUser(req.user);
        res.status(result.success ? 200 : 404).json(result);
    }

    static async getFilteredUsers(req: Request, res: Response): Promise<void> {
        const { minAge, maxAge, city, state } = req?.query;

        const result = await UserService.filterUsers(
            Number(minAge),
            Number(maxAge),
            String(city),
            String(state)
        );
        res.status(result.success ? 200 : 404).json(result);
    }

    static async getUserProfile(req: Request, res: Response): Promise<void> {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Profile fetched successfully",
            data: user,
        });
    }

    static async updateUserProfile(req: Request, res: Response): Promise<void> {
        const userId = req.user._id;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Profile updated successfully",
            data: user,
        });
    }

    static async saveFCMToken(req: Request, res: Response): Promise<void> {
        const userId = req.user._id;
        const { fcmToken } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { fcmToken },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "FCM token saved successfully" });
    }
}
