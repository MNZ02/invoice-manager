const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: Number,
    required: true
  },
  maxInvoices: {
    type: Number,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['monthly', 'quarterly', 'annually']
  }
})

module.exports = mongoose.model('Plan', planSchema)
