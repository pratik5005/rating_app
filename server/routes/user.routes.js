// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { isNormalUser } = require('../middlewares/role.middleware');

router.use(verifyToken, isNormalUser);

router.get('/stores', userController.getAllStoresWithRatings);
router.post('/rate', userController.submitRating);
router.put('/password', userController.updatePassword);

module.exports = router;
