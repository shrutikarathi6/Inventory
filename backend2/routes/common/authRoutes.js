const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/common/User");
// const { JWT_SECRET } = require("../config");
require("dotenv").config();

JWT_SECRET=process.env.JWT_SECRET;

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
      
      res.json({ token, user: { email: user.email } });
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  });
  

// Protected Route Example
router.get("/protected", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ msg: "Access granted", userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

module.exports = router;
