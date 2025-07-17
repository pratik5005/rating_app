// server/controllers/user.controller.js
const Rating = require('../models/rating.model');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.getAllStoresWithRatings = (req, res) => {
  const userId = req.user.id;

  Rating.getUserRatings(userId, (err, result) => {
    if (err) return res.status(500).json({ message: "Error getting stores" });
    res.json(result);
  });
};

exports.submitRating = (req, res) => {
  const userId = req.user.id;
  const { storeId, ratingValue } = req.body;

  if (!storeId || !ratingValue || ratingValue < 1 || ratingValue > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  Rating.submit(userId, storeId, ratingValue, (err, result) => {
    if (err) return res.status(500).json({ message: "Rating failed" });
    res.json({ message: "Rating submitted/updated" });
  });
};

exports.updatePassword = (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "Password too short" });
  }

  const hashed = bcrypt.hashSync(newPassword, 10);
  db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Password update failed" });
    res.json({ message: "Password updated" });
  });
};
