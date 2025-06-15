import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
    id: string;
}

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
) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("User not authenticated");
    }

    const verified = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    const user = await User.findById(verified.id);
    if (!user) return res.status(401).send("User not authenticated");
    req.user = user;
    next();
};
