const User = require('../models/User');
const Plan = require('../models/Plan');



const multer = require("multer");
const fs = require("fs");



// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Create user with validation and error handling
exports.createUser = [
  upload.single("logo"),
  async (req, res) => {
    try {
      // Validate request body
      const {
        businessName,
        email,
        contact,
        bankName,
        bankAccountNumber,
        ifscCode,
        GST,
        address,
        bankAccountHolderName,
      } = req.body;
      if (
        !businessName ||
        !email ||
        !contact ||
        !bankName ||
        !bankAccountNumber ||
        !ifscCode ||
        !address ||
        !bankAccountHolderName
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user with email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Handle logo upload
      const logoPath = req.file ? req.file.path : null;

      // Create user
      const newUser = new User({
        businessName,
        email,
        contact,
        bankName,
        bankAccountNumber,
        ifscCode,
        GST,
        address,
        bankAccountHolderName,
        logoPath,
      });
      await newUser.save();

      res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const filter = req.body;
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.registerUser = async (req, res) => {
  try {
    // Validate request body
    const { username, email, password, planId } = req.body;
    if (!username || !email || !password || !planId) {
      return res.status(400).json({ message: 'Username, email, password, and plan ID are required' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Create new user
    const newUser = new User({ username, email, password, plan: planId });
    await newUser.save();

    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
