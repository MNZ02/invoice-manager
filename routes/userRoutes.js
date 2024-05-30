const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const authenticateUser = require('../middleware/auth')
const refreshTokenMiddleware = require('../middleware/refreshToken')

// Create user route with validation
router.post(
  '/users',

  [
    body('businessName').notEmpty().withMessage('Business name is required'),
    body('email').isEmail().withMessage('Invalid email address')
    // Add more validations for other fields
  ],
  authenticateUser,
  userController.createUser
)

// Get all users
router.get(
  '/users',
  refreshTokenMiddleware,
  authenticateUser,
  userController.getAllUsers
)

// Get user by ID
router.get(
  '/users/:id',
  refreshTokenMiddleware,
  authenticateUser,
  userController.getUserById
)

// Update user by ID
router.put(
  '/users/:id',
  refreshTokenMiddleware,
  authenticateUser,
  userController.updateUserById
)

// Delete user by ID
router.delete(
  '/users/:id',
  refreshTokenMiddleware,
  authenticateUser,
  userController.deleteUserById
)

router.post('/register', userController.registerUser)
router.post('/login', userController.login)
router.post('/register/admin', userController.registerAdmin)
router.post('/login/admin', userController.loginAdmin)
module.exports = router
