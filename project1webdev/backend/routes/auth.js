const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===========================
// REGISTER ROUTE
// ===========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User Created with Hash!" });
  } catch (err) {
    res.json({ error: "Registration failed", details: err.message });
  }
});

// ===========================
// LOGIN ROUTE
// ===========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Incorrect password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Response
    res.json({
      message: "Login successful!",
      token: token,
    });

  } catch (err) {
    res.json({ error: "Login failed", details: err.message });
  }
});

// Export router
module.exports = router;

