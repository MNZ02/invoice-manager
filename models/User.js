const mongoose = require('mongoose')

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
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
