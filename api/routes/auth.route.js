import express from "express";
import { signup, signin } from "../controllers/auth.controller.js"; // Ensure both are imported

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
