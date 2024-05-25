// app.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const planRoutes = require('./routes/planRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)
app.use('/uploads', express.static('uploads'))
// Routes
app.use('/api', userRoutes)
app.use('/api', planRoutes)
app.use('/api', invoiceRoutes)
app.use('/api', subscriptionRoutes)
app.use('/api/payment', paymentRoutes)

// Database connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err))

// Start server
const PORT = process.env.PORT || 5400
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
