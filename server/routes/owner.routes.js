// server/routes/owner.routes.js
const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { isOwner } = require('../middlewares/role.middleware');

router.use(verifyToken, isOwner);

router.get('/ratings', ownerController.getStoreRatings);
router.get('/average-rating', ownerController.getAverageRating);
router.put('/password', ownerController.updatePassword);

module.exports = router;
