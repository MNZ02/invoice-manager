const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/auth')
const paymentController = require('../controllers/paymentController')
const refreshTokenMiddleware = require('../middleware/refreshToken')

router.post(
  '/orders',
  refreshTokenMiddleware,
  authenticateUser,
  paymentController.createOrder
)

router.post(
  '/verification',
  refreshTokenMiddleware,
  authenticateUser,
  paymentController.paymentVerification
)

router.get(
  '/getKey',
  refreshTokenMiddleware,
  authenticateUser,
  paymentController.getKey
)

module.exports = router
