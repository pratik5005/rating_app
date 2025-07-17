// server/models/user.model.js

const db = require('../config/db'); // Make sure this exports a working MySQL connection

exports.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("MySQL error in findByEmail:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

exports.create = (userData, callback) => {
  const { name, email, password, address, role } = userData;
  const query = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, password, address, role], (err, results) => {
    if (err) {
      console.error("MySQL error in create:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};
