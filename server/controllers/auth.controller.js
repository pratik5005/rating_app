// server/controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = (req, res) => {
  const { name, email, password, address, role } = req.body;
  if (!name || !email || !password || !address || !role)
    return res.status(400).json({ message: "All fields required" });

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Server error while checking email" });
    }

    if (results && results.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ name, email, password: hashedPassword, address, role }, (err2, results2) => {
      if (err2) {
        console.error("User creation failed:", err2);
        return res.status(500).json({ message: "User creation failed" });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error during login" });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};
