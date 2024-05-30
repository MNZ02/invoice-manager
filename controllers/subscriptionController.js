const Subscription = require('../models/Subscription')
const Plan = require('../models/Plan')
// Subscribe to a plan
exports.subscribe = async (req, res) => {
  try {
    const { userId, planId } = req.body

    const startDate = new Date()
    const plan = await Plan.findById(planId)
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' })
    }

    const endDate = new Date(
      startDate.getTime() + plan.validity * 24 * 60 * 60 * 1000
    ) // Assuming `plan.validity` is in days

    const newSubscription = new Subscription({
      user: userId,
      plan: planId,
      startDate,
      endDate,
      isActive: true
    })

    await newSubscription.save()
    res.status(201).json(newSubscription)
  } catch (error) {
    console.error('Error creating subscription:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getLatestSubscription = async (req, res) => {
  try {
    const userId = req.params.userId

    const latestSubscription = await Subscription.findOne({ user: userId })
      .sort({ startDate: -1 }) // Sort by startDate in descending order
      .populate('plan')

    if (!latestSubscription) {
      return res.status(404).json({ message: 'No subscription found' })
    }

    res.status(200).json(latestSubscription)
  } catch (error) {
    console.error('Error fetching latest subscription:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
    res.status(200).json(subscriptions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' })
    }
    res.status(200).json(subscription)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Update subscription by ID
exports.updateSubscriptionById = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' })
    }
    res.status(200).json(updatedSubscription)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Delete subscription by ID
exports.deleteSubscriptionById = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    )
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' })
    }
    res.status(200).json({ message: 'Subscription deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
exports.deactivateExpiredSubscriptions = async () => {
  try {
    // Find all active subscriptions that have expired
    const expiredSubscriptions = await Subscription.find({
      endDate: { $lt: new Date() },
      isActive: true
    })

    // Deactivate each expired subscription
    for (const subscription of expiredSubscriptions) {
      subscription.isActive = false
      await subscription.save()
      console.log(`Subscription for user '${subscription.user}' deactivated.`)
    }
    console.log('Expired subscriptions deactivation completed.')
  } catch (error) {
    console.error('Error deactivating expired subscriptions:', error)
  }
}
