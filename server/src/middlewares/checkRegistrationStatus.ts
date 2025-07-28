import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const checkRegistrationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token is required"
            });
            return;
        }

        const decoded = (await jwt.verify(
            token,
            process.env.JWT_SECRET_KEY!
        )) as {
            id: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        if (user.phoneNumber && user.gender && user.dateOfBirth && user.profession && user.city && user.state) {
            res.status(400).json({
                success: false,
                message: "User registration is already completed. Cannot update again."
            });
            return;
        }

        next();
    } catch (error) {
        console.error("Error in checkRegistrationStatus middleware:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        return;
    }
}; 