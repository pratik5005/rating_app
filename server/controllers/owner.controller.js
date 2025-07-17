// server/controllers/owner.controller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getStoreRatings = (req, res) => {
  const ownerId = req.user.id;

  // Get store owned by this user
  db.query("SELECT id FROM stores WHERE email = (SELECT email FROM users WHERE id = ?)", [ownerId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: "Store not found" });

    const storeId = result[0].id;

    db.query(
      `SELECT u.name, u.email, r.rating_value 
       FROM ratings r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.store_id = ?`,
      [storeId],
      (err2, rows) => {
        if (err2) return res.status(500).json({ message: "Error fetching ratings" });
        res.json(rows);
      }
    );
  });
};

exports.getAverageRating = (req, res) => {
  const ownerId = req.user.id;

  db.query("SELECT id FROM stores WHERE email = (SELECT email FROM users WHERE id = ?)", [ownerId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: "Store not found" });

    const storeId = result[0].id;

    db.query(
      `SELECT AVG(rating_value) AS average_rating 
       FROM ratings WHERE store_id = ?`,
      [storeId],
      (err2, rows) => {
        if (err2) return res.status(500).json({ message: "Error fetching average rating" });
        res.json(rows[0]);
      }
    );
  });
};

exports.updatePassword = (req, res) => {
  const ownerId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "Password too short" });
  }

  const hashed = bcrypt.hashSync(newPassword, 10);
  db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, ownerId], (err, result) => {
    if (err) return res.status(500).json({ message: "Password update failed" });
    res.json({ message: "Password updated" });
  });
};
