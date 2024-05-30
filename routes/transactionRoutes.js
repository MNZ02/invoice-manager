const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/auth')
const transactionController = require('../controllers/transactionController')
const refreshTokenMiddleware = require('../middleware/refreshToken')

router.get(
  '/users/:userId/transactions',
  refreshTokenMiddleware,
  authenticateUser,
  transactionController.getTransaction
)

router.post(
  '/transactions',
  refreshTokenMiddleware,
  authenticateUser,
  transactionController.createTransaction
)

module.exports = router
