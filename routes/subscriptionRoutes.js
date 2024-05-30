const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptionController')
const authenticateUser = require('../middleware/auth')
const refreshTokenMiddleware = require('../middleware/refreshToken')

router.post('/subscribe', authenticateUser, subscriptionController.subscribe)

router.get(
  '/subscriptions',
  refreshTokenMiddleware,
  authenticateUser,
  subscriptionController.getAllSubscriptions
)

router.get(
  '/subscriptions/:userId',
  subscriptionController.getLatestSubscription
)

router.post('/deactivate-expired-subscriptions', async (req, res) => {
  try {
    await deactivateExpiredSubscriptions()
    res
      .status(200)
      .json({ message: 'Expired subscriptions deactivated successfully' })
  } catch (error) {
    console.error('Error deactivating expired subscriptions:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
module.exports = router
