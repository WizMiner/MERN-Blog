import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js"; // Ensure both are imported

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google)

export default router;
