import express from "express";
import { viewUserProfile } from "../controllers/profileView.controller.js";
import { verifiedUser } from "../middlewares/verified.js";

const router = express.Router();

router.post("/profileView/:viewedUserId", verifiedUser, viewUserProfile);
router.get("/api/notification", verifiedUser, getNotificationsForUser);

export default router;
