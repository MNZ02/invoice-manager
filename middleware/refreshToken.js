const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken (req, res, next) {
  const token = req.headers.authorization
  const refreshToken = req.cookies['refreshToken']

  // Check if access token exists
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        // Access token is invalid or expired
        if (!refreshToken) {
          return res.status(401).json({ message: 'Invalid token' })
        }

        // Verify refresh token if access token is invalid
        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET_KEY,
          (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid refresh token' })
            }
            req.user = decoded // Store user information from refresh token
            next()
          }
        )
      } else {
        // Access token is valid, proceed with the next middleware or route handler
        req.user = decoded // Store user information from access token
        next()
      }
    })
  } else if (refreshToken) {
    // If access token is missing but refresh token exists
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid refresh token' })
        }
        req.user = decoded // Store user information from refresh token
        next()
      }
    )
  } else {
    // If both access token and refresh token are missing
    return res.status(403).json({ message: 'Token is required' })
  }
}

module.exports = verifyToken
