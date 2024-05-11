const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken (req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ message: 'Token is required' })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = decoded
    next()
  })
}

module.exports = verifyToken
