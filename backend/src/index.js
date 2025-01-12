const express = require('express');
const mongoose = require('mongoose');
const coinRoutes = require('./routes/coinRoutes');  // Import your coin routes
const deviationRoute = require('./routes/deviationRoute');  // Import deviation routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api', coinRoutes);  
app.use('/api', deviationRoute);  

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_db';  // Use environment variable or fallback
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to local database: crypto_db`);
    const PORT = process.env.PORT || 3000;  // Use environment variable for port
    app.listen(PORT, () => {  
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(`Error connecting to the database: ${err}`));