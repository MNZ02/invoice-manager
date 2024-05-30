const mongoose = require('mongoose')
const { refreshToken } = require('../controllers/refreshTokenController')

const userSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact: String,
  bankName: String,
  bankAccountNumber: String,
  ifscCode: String,
  GST: String,
  address: String,
  bankAccountHolderName: String,
  businessLogo: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  selectedPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ],
  refreshToken: {
    type: String,
    default: null
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
