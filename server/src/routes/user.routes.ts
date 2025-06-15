import express, { RequestHandler } from "express";
import { UserController } from "../controllers/user.controller";
import { verifiedUser } from "../middlewares/verified";
import User from "../models/user.model";

const router = express.Router();

router.post("/register", UserController.register as RequestHandler);

router.post("/login", UserController.loginUser as RequestHandler);

router.get(
    "/allusers",
    verifiedUser,
    UserController.getAllUsers as RequestHandler
);

router.get(
    "/profile",
    verifiedUser,
    UserController.getUserProfile as RequestHandler
);

router.patch(
    "/profile",
    verifiedUser,
    UserController.updateUserProfile as RequestHandler
);

router.get(
    "/search",
    verifiedUser,
    UserController.getFilteredUsers as RequestHandler
);

router.post(
    "/save-fcm-token",
    verifiedUser,
    UserController.saveFCMToken as RequestHandler
);

export default router;
