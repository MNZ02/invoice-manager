const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')

router.post('/orders', paymentController.createOrder)

router.route('/verification').post(paymentController.paymentVerification)

router.get('/getKey', paymentController.getKey)

module.exports = router
