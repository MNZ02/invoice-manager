const User = require('../models/User')
const Plan = require('../models/Plan')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const multer = require('multer')
const fs = require('fs')

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Create user with validation and error handling
exports.createUser = [
  upload.single('logo'),
  async (req, res) => {
    try {
      // Validate request body
      const {
        businessName,
        email,
        password,
        contact,
        bankName,
        bankAccountNumber,
        ifscCode,
        GST,
        address,
        bankAccountHolderName
      } = req.body
      if (
        !businessName ||
        !email ||
        !password ||
        !contact ||
        !bankName ||
        !bankAccountNumber ||
        !ifscCode ||
        !address ||
        !bankAccountHolderName
      ) {
        return res.status(400).json({ message: 'All fields are required' })
      }

      // Check if user with email already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      // Handle logo upload
      const logoPath = req.file ? req.file.path : null

      // Create user
      const newUser = new User({
        businessName,
        email,
        password: hashedPassword,
        contact,
        bankName,
        bankAccountNumber,
        ifscCode,
        GST,
        address,
        bankAccountHolderName,
        logoPath
      })
      await newUser.save()

      res.json({ message: 'User created successfully', user: newUser })
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
]

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const filter = req.body
    const users = await User.find(filter)
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.registerUser = async (req, res) => {
  try {
    // Validate request body
    // const { username, email, password, planId } = req.body
    // if (!username || !email || !password || !planId) {
    //   return res.status(400).json({
    //     message: 'Username, email, password, and plan ID are required'
    //   })
    // }

    const {
      businessName,
      email,
      contact,
      password,
      bankName,
      bankAccountNumber,
      ifscCode,
      GST,
      address,
      bankAccountHolderName
    } = req.body
    if (
      !businessName ||
      !email ||
      !password ||
      !contact ||
      !bankName ||
      !bankAccountNumber ||
      !ifscCode ||
      !address ||
      !bankAccountHolderName
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // // Handle logo upload
    // const logoPath = req.file ? req.file.path : null

    // Create user
    const newUser = new User({
      businessName,
      email,
      password: hashedPassword,
      contact,
      bankName,
      bankAccountNumber,
      ifscCode,
      GST,
      address,
      bankAccountHolderName
    })
    await newUser.save()

    res.json({
      message: 'User created successfully',
      user: newUser,
      role: newUser.role
    })

    // // Check if plan exists
    // const plan = await Plan.findById(planId)
    // if (!plan) {
    //   return res.status(404).json({ message: 'Plan not found' })
    // }

    // // Create new user
    // const newUser = new User({ username, email, password, plan: planId })
    // await newUser.save()

    // res.json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    // Check if user with email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check password
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (!matchedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // If authentication successful, generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    )
    res.json({ token, role: user.role })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.registerAdmin = async (req, res) => {
  try {
    const { businessName, email, password } = req.body

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' })

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = new User({
      businessName,
      email,
      password: hashedPassword,
      role: 'admin'
    })

    // Save admin user to database
    await admin.save()

    res.status(201).json({
      message: 'Admin user created successfully',
      admin,
      role: admin.role
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    // Check if user with email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const matchedPassword = await bcrypt.compare(password, user.password)
    // Check password
    if (!matchedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    } else {
      const token = jwt.sign(
        { adminId: user._id, email: user.email, role: user.role }, // Changed admin to user
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      )

      res.status(200).json({
        message: 'Admin logged in successfully',
        token,
        role: user.role
      })
    }
  } catch (error) {
    console.error('Error during login:', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
