const express = require('express');
const mongoose = require('mongoose');
const coinRoutes = require('./routes/coinRoutes');  // Import your coin routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api', coinRoutes);  // Prefix your routes with /api

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/crypto_db';  // Changed hostname to localhost
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to local database: crypto_db`);
    app.listen(3000, () => {  // Changed port to 3000
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => console.error(`Error connecting to the database: ${err}`));