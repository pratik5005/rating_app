// server/controllers/admin.controller.js
const db = require('../config/db');
const User = require('../models/user.model');
const Store = require('../models/store.model');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({ name, email, password: hashedPassword, address, role }, (err, result) => {
    if (err) return res.status(500).json({ message: "User creation failed" });
    res.status(201).json({ message: "User created" });
  });
};

exports.createStore = (req, res) => {
  const { name, email, address } = req.body;
  Store.create({ name, email, address }, (err, result) => {
    if (err) return res.status(500).json({ message: "Store creation failed" });
    res.status(201).json({ message: "Store added" });
  });
};

exports.getDashboard = (req, res) => {
  const counts = {};
  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, users) => {
    counts.users = users[0].totalUsers;
    db.query("SELECT COUNT(*) AS totalStores FROM stores", (err2, stores) => {
      counts.stores = stores[0].totalStores;
      db.query("SELECT COUNT(*) AS totalRatings FROM ratings", (err3, ratings) => {
        counts.ratings = ratings[0].totalRatings;
        res.json(counts);
      });
    });
  });
};

exports.getAllUsers = (req, res) => {
  db.query("SELECT id, name, email, address, role FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving users" });
    res.json(result);
  });
};

exports.getAllStores = (req, res) => {
  Store.getAll((err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving stores" });
    res.json(result);
  });
};
