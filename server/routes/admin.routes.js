// server/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.use(verifyToken, isAdmin);

router.post('/create-user', adminController.createUser);
router.post('/create-store', adminController.createStore);
router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getAllUsers);
router.get('/stores', adminController.getAllStores);

module.exports = router;
