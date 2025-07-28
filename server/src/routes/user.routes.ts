import express, { RequestHandler } from "express";
import { UserController } from "../controllers/user.controller";
import { verifiedUser } from "../middlewares/verified";
import { checkRegistrationStatus } from "../middlewares/checkRegistrationStatus";
import upload from "./../config/multer";
const router = express.Router();

router.post("/auth/send-otp", UserController.sendOtp);

router.post("/auth/verify-otp", UserController.verifyOtp);

router.post(
    "/register/credentials",
    checkRegistrationStatus,
    UserController.userRegistrationWithNamePassword
);

router.post(
    "/complete-registration",
    checkRegistrationStatus,
    upload.single("profilePicture"),
    UserController.completeProfileRegistration
);

router.post("/login", UserController.loginUser as RequestHandler);

router.get(
    "/allusers",
    verifiedUser,
    UserController.getAllCoUsers as RequestHandler
);

router.get("/getFilteredUsers", verifiedUser, UserController.getFilteredUsers);

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
