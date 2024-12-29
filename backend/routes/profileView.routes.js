import express from "express";
import { getNotificationsForUser, viewUserProfile } from "../controllers/profileView.controller.js";
import { verifiedUser } from "../middlewares/verified.js";

const router = express.Router();

router.post("/api/profileView/:viewedUserId", verifiedUser, viewUserProfile);
router.get("/api/notification", verifiedUser, getNotificationsForUser);

export default router;
