const User = require('../models/User')

const checkInvoiceLimit = async (req, res, next) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const user = await User.findById(userId).populate('selectedPlan')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.selectedPlan) {
      return res.status(400).json({ message: 'User has no selected plan' })
    }

    if (
      user.createdInvoices > user.selectedPlan.maxInvoices ||
      user.selectedPlan.maxInvoices <= 0 ||
      user.selectedPlan.maxInvoices === null
    ) {
      return res
        .status(403)
        .json({ message: 'Invoice limit reached for the plan' })
    }

    next()
  } catch (error) {
    console.error('Error in checkInvoiceLimit middleware: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = checkInvoiceLimit
