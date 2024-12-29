import express from "express";
import { like } from "../controllers/matchRequest.controller.js";
import { verifiedUser } from "../middlewares/verified.js";

const router = express.Router();

//like route
router.post("/api/like/:likedUserId", verifiedUser, like);

export default router;
