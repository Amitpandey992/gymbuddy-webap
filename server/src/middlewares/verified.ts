import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export const verifiedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        ) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
