import User from "../models/user.model.js";
import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        const result = await UserService.registerUser(req.body);
        res.status(result.success ? 200 : 404).json(result);
    }

    static async loginUser(req: Request, res: Response): Promise<void> {
        const result = await UserService.loginUser(
            req.body.email,
            req.body.password
        );
        res.status(result.success ? 200 : 404).json(result);
    }

    static async getAllUsers(req: Request, res: Response): Promise<void> {
        const result = await UserService.getAllUser(req.user);
        res.status(result.success ? 200 : 404).json(result);
    }

    static async getFilteredUsers(req: Request, res: Response): Promise<void> {
        const { minAge, maxAge, city, state } = req.query;
        let filters: any = {};
        if (city) filters.city = city;
        if (state) filters.state = state;
        if (minAge || maxAge) {
            const currentYear = new Date().getFullYear();
            if (minAge) {
                filters.dateOfBirth = {
                    ...filters.dateOfBirth,
                    $lte: new Date(`${currentYear - Number(minAge)}-12-31`),
                };
            }
            if (maxAge) {
                filters.dateOfBirth = {
                    ...filters.dateOfBirth,
                    $gte: new Date(`${currentYear - Number(maxAge)}-01-01`),
                };
            }
        }
        const users = await User.find(filters);
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
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
