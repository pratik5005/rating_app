// server/models/rating.model.js
const db = require('../config/db');

const Rating = {
  submit: (userId, storeId, ratingValue, callback) => {
    db.query(
      `INSERT INTO ratings (user_id, store_id, rating_value)
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE rating_value = ?`,
      [userId, storeId, ratingValue, ratingValue],
      callback
    );
  },

  getUserRatings: (userId, callback) => {
    db.query(
      `SELECT s.id AS store_id, s.name, s.address, 
              IFNULL(AVG(r.rating_value), 0) AS overall_rating,
              ur.rating_value AS user_rating
       FROM stores s
       LEFT JOIN ratings r ON r.store_id = s.id
       LEFT JOIN ratings ur ON ur.store_id = s.id AND ur.user_id = ?
       GROUP BY s.id`,
      [userId],
      callback
    );
  }
};

module.exports = Rating;
