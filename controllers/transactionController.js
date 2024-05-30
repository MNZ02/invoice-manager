const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Payment = require('../models/Payments')

exports.getTransaction = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId).populate('transactions')
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user.transactions)
  } catch (error) {
    console.error('Error fetching user transactions:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.createTransaction = async (req, res) => {
  const {
    userId,
    planId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    currency,
    status
  } = req.body

  try {
    //validate user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // //validate payment
    // const payment = await Payment.findById(paymentId)
    // if (!payment) {
    //   return res.status(404).json({ message: 'Payment not found' })
    // }
    const transaction = new Transaction({
      user: userId,
      plan: planId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency: currency || 'INR',
      status: status || 'pending',
      createdAt: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })

    await transaction.save()

    user.transactions.push(transaction._id)
    await user.save()

    res.status(201).json(transaction)
    console.log('Transaction created:', transaction)
  } catch (error) {
    console.error('Error creating transaction:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
