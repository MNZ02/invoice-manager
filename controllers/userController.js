<<<<<<< HEAD
const User = require('../models/User');
const Plan = require('../models/Plan');



const multer = require("multer");
const fs = require("fs");


=======
const User = require('../models/User')
const Plan = require('../models/Plan')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const multer = require('multer')
const fs = require('fs')
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
<<<<<<< HEAD
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
=======
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
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
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
<<<<<<< HEAD
        bankAccountHolderName,
      } = req.body;
=======
        bankAccountHolderName
      } = req.body
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
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
<<<<<<< HEAD
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
=======
        return res.status(400).json({ message: 'All fields are required' })
      }

      // Check if user with email already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' })
      }

      // Handle logo upload
      const logoPath = req.file ? req.file.path : null
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

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
<<<<<<< HEAD
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
=======
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
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
<<<<<<< HEAD
    const filter = req.body;
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
=======
    const filter = req.body
    const users = await User.find(filter)
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
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
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
<<<<<<< HEAD
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
=======
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
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
<<<<<<< HEAD
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

=======
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
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

exports.registerUser = async (req, res) => {
  try {
    // Validate request body
<<<<<<< HEAD
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
=======
    const { username, email, password, planId } = req.body
    if (!username || !email || !password || !planId) {
      return res.status(400).json({
        message: 'Username, email, password, and plan ID are required'
      })
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' })
    }

    // Check if plan exists
    const plan = await Plan.findById(planId)
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' })
    }

    // Create new user
    const newUser = new User({ username, email, password, plan: planId })
    await newUser.save()

    res.json({ message: 'User registered successfully', user: newUser })
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
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // If authentication successful, generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    )
    res.json({ token })
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
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

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

    res.status(201).json({ message: 'Admin user created successfully', admin })
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
      res.status(200).json({ message: 'Admin logged in successfully' })
    }
  } catch (error) {
    console.error('Error during login:', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
