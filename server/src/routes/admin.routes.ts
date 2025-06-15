import express from "express";
import { adminLogin, getAllUsers } from "../controllers/admin.Controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/getAllUser", getAllUsers);
export default router;
