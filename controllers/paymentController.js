const Razorpay = require('razorpay')
const crypto = require('crypto')
const Payment = require('../models/Payments')

exports.createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    })

    const options = {
      amount: Number(req.body.amount * 100),
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`
    }

    const order = await instance.orders.create(options)

    if (!order)
      return res.status(500).send('Some error occured in creating order')

    res.json({
      success: true,
      order
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body

    const secret = process.env.RAZORPAY_SECRET

    // Creating the expected signature
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(razorpay_order_id + '|' + razorpay_payment_id)
    const expectedSignature = shasum.digest('hex')

    // Verifying the signature
    if (expectedSignature === razorpay_signature) {
      // Signature matched

      //save payment details in database
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })

      res.json({
        status: 'success',
        message: 'Payment verification successful',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      })
    } else {
      // Signature did not match
      res.status(400).json({ status: 'failure', message: 'Invalid signature' })
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
  }
}

exports.getKey = async (req, res) => {
  try {
    res.status(200).json({
      key_id: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    console.error('Error retrieving Razorpay key:', error)
  }
}
