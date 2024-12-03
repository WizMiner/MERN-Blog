import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware to parse JSON
app.use(express.json());

app.use(cookieParser());

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
