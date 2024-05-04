const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const User = require("../models/User");

// Login function with validation and error handling
