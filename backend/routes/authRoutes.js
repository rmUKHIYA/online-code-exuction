const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "JWT_SECRET"; // Use environment variable

// ✅ User Signup API
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
      // Check if user with the same email or username already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email already registered" });

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) return res.status(400).json({ message: "Username is already taken" });

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ username, email, passwordHash: hashedPassword });

      // Generate JWT token
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || "your_secret_key", {
        expiresIn: "1h",
      });

      res.status(201).json({
        message: "User created successfully",
        token,
        userId: newUser.id,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ✅ User Login API
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ message: "Login successful", token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
