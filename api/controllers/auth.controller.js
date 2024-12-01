import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js"; // Adjust path if needed
import jwt from "jsonwebtoken";

// Signup function for user registration
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Hash the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key errors (e.g., duplicate email)
      return next(errorHandler(400, "Email is already registered"));
    }
    next(errorHandler(500, error.message)); // Pass other errors to the global error handler
  }
};

// Signin function for user login
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    // Check if the password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return next(
        errorHandler(500, "JWT Secret is not defined in environment")
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return the token and user info (without password)
    const { password: userPassword, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true for production
        sameSite: "strict", // Helps to avoid CSRF
      })
      .json({ message: "Signin successful", user: rest });
  } catch (error) {
    next(error);
  }
};

// Google Authentication function
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      // If the user exists, generate and send a token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Set token expiration time (e.g., 1 day)
      );

      // Omit the password from the response
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      // If the user does not exist, create a new user
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      // Generate a token for the new user
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Set token expiration time (e.g., 1 day)
      );

      // Omit the password from the response
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
