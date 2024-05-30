const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const invoiceController = require('../controllers/invoiceController')
const authenticateUser = require('../middleware/auth')
const refreshTokenMiddleware = require('../middleware/refreshToken')
// Create invoice route with validation
router.post(
  '/invoices',
  [
    body('user').notEmpty().withMessage('User ID is required')
    // Add more validations for other fields
  ],
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.createInvoice
)

// Get all invoices
router.get(
  '/invoices',
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.getAllInvoices
)

router.get(
  '/invoices/:userId',
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.getInvoiceByUserId
)

// Get invoice by ID
router.get(
  '/invoices/:id',
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.getInvoiceById
)

// Update invoice by ID
router.put(
  '/invoices/:id',
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.updateInvoiceById
)

// Delete invoice by ID
router.delete(
  '/invoices/:id',
  refreshTokenMiddleware,
  authenticateUser,
  invoiceController.deleteInvoiceById
)

module.exports = router
