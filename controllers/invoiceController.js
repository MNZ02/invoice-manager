const Invoice = require('../models/Invoice')
const User = require('../models/User')
// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body)
    await newInvoice.save()

    const user = await User.findById(req.params.userId)
    user.createdInvoices += 1
    await user.save()

    res.status(201).json(newInvoice)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
    res.status(200).json(invoices)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getInvoiceByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const invoices = await Invoice.find({ user: userId })
    res.status(200).json(invoices)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    console.log(invoice)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.status(200).json(invoice)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Update invoice by ID
exports.updateInvoiceById = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.status(200).json(updatedInvoice)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Delete invoice by ID
exports.deleteInvoiceById = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id)
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.status(200).json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.remainingInvoices = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate({
      path: 'selectedPlan',
      select: 'maxInvoices'
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const plan = user.selectedPlan

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' })
    }

    const remainingInvoices = plan.maxInvoices - user.createdInvoices

    res.status(200).json({ remainingInvoices })
  } catch (error) {
    console.error('Error checking invoice limit:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.resetInvoiceCount = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findByIdAndUpdate(userId, { createdInvoices: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'Invoice count reset successfully' })
  } catch (error) {
    console.error('Error resetting invoice count:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
