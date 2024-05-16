const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  amount: Number
})

const invoiceSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  items: [itemSchema], // Using itemSchema for items array
  totalAmount: {
    type: Number,
    required: true
  },
  additionalNotes: String,
  invoiceNumber: {
    type: String,
    unique: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  clientName: String,
  clientAddress: String
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
