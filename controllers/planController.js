const Plan = require('../models/Plan')

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body)

    const planExists = await Plan.find({ name: newPlan.name })

    if (planExists.length > 0) {
      return res.status(400).json({ message: 'Plan already exists' })
    }

    await newPlan.save()
    res.status(201).json(newPlan)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
    res.status(200).json(plans)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' })
    }
    res.status(200).json(plan)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Update plan by ID
exports.updatePlanById = async (req, res) => {
  try {
    // Remove the "_id" field from req.body
    const { _id, ...updatedFields } = req.body

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    )

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' })
    }

    res.status(200).json(updatedPlan)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Delete plan by ID
exports.deletePlanById = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id)
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' })
    }
    res.status(200).json({ message: 'Plan deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
