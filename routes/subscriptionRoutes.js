const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticateUser = require('../middleware/auth');

router.post('/subscribe', authenticateUser, subscriptionController.subscribe);
router.get('/subscriptions', authenticateUser, subscriptionController.getAllSubscriptions);

module.exports = router;
