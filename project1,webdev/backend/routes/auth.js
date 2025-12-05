const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.json({ message: "User Created!" });
});

module.exports = router;
