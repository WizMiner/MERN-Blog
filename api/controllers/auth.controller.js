import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Error handler function (if you don't have one already)
const errorHandler = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const signup = async (req, res, next) => {
  // Ensure 'next' is passed as parameter
  const { username, email, password } = req.body;

  // Check if any of the fields are missing or empty
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required")); // Call next with the error
  }

  // Hash password before saving
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user object
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
