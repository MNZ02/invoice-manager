const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'User',
    required: true
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      amount: Number
    }
  ],
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
