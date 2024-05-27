const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const invoiceController = require('../controllers/invoiceController')
const authenticateUser = require('../middleware/auth')

// Create invoice route with validation
router.post(
  '/invoices',
  [
    body('user').notEmpty().withMessage('User ID is required')
    // Add more validations for other fields
  ],
  authenticateUser,
  invoiceController.createInvoice
)

// Get all invoices
router.get('/invoices', authenticateUser, invoiceController.getAllInvoices)

router.get(
  '/invoices/:userId',
  authenticateUser,
  invoiceController.getInvoiceByUserId
)

// Get invoice by ID
router.get('/invoices/:id', authenticateUser, invoiceController.getInvoiceById)

// Update invoice by ID
router.put(
  '/invoices/:id',
  authenticateUser,
  invoiceController.updateInvoiceById
)

// Delete invoice by ID
router.delete(
  '/invoices/:id',
  authenticateUser,
  invoiceController.deleteInvoiceById
)

module.exports = router
