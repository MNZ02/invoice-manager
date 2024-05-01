const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const planController = require('../controllers/planController');
const authenticateUser = require('../middleware/auth');

// Create plan route with validation
router.post(
  '/plans',
  [
    body('name').notEmpty().withMessage('Plan name is required'),
    // Add more validations for other fields
  ],
  authenticateUser,
  planController.createPlan
);

// Get all plans
router.get('/plans', authenticateUser, planController.getAllPlans);

// Get plan by ID
router.get('/plans/:id', authenticateUser, planController.getPlanById);

// Update plan by ID
router.put('/plans/:id', authenticateUser, planController.updatePlanById);

// Delete plan by ID
router.delete('/plans/:id', authenticateUser, planController.deletePlanById);

module.exports = router;
