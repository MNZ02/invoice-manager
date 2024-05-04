// app.js

<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);
app.use("/api", planRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", subscriptionRoutes);
=======
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const planRoutes = require('./routes/planRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')

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
// Routes
app.use('/api', userRoutes)
app.use('/api', planRoutes)
app.use('/api', invoiceRoutes)
app.use('/api', subscriptionRoutes)
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

// Database connection
mongoose
  .connect(process.env.MONGO_DB)
<<<<<<< HEAD
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err))

// Start server
const PORT = process.env.PORT || 5400
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
