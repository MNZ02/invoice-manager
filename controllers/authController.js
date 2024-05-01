const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const User = require("../models/User");

// Login function with validation and error handling
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If authentication successful, generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
