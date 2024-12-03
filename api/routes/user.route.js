import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test); // No authentication needed
router.put("/update/:userId", verifyToken, updateUser); // Auth required

export default router;
