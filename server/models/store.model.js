// server/models/store.model.js
const db = require('../config/db');

const Store = {
  create: (data, callback) => {
    const { name, email, address } = data;
    db.query(
      "INSERT INTO stores (name, email, address) VALUES (?, ?, ?)",
      [name, email, address],
      callback
    );
  },

  getAll: (callback) => {
    db.query(
      `SELECT s.*, 
        IFNULL(AVG(r.rating_value), 0) AS rating 
       FROM stores s 
       LEFT JOIN ratings r ON s.id = r.store_id 
       GROUP BY s.id`,
      callback
    );
  }
};

module.exports = Store;
