const jwt = require('jsonwebtoken')

exports.refreshToken = async (req, res) => {
  const token = req.headers.authorization
  const refreshToken = req.cookies['refreshToken']

  if (!refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid refresh token' })
      }
      const newToken = jwt.sign(
        {
          userId: decoded.userId,
          email: decoded.email
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      )
      res.json({ token: newToken })
    }
  )
}
