const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },

  razorpay_order_id: {
    type: String,
    required: true
  },
  razorpay_payment_id: {
    type: String,
    required: true
  },
  razorpay_signature: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  }
})
transactionSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const plan = await mongoose.model('Plan').findById(this.plan)
      if (!plan) {
        throw new Error('Plan not found')
      }
      const validityDays = plan.validity
      this.expiryDate = new Date(
        this.createdAt.getTime() + validityDays * 24 * 60 * 60 * 1000
      )
    } catch (error) {
      return next(error)
    }
  }
  next()
})
const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
