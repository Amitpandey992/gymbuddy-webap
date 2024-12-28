import express from "express";
import { adminLogin, getAllUsers } from "../controllers/admin.Controller.js";

const router = express.Router();

router.post("/api/admin/login", adminLogin);
router.get("/api/admin/getAllUser", getAllUsers);
export default router;
