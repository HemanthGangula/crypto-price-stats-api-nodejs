const express = require('express');
const mongoose = require('mongoose');
const coinRoutes = require('./routes/coinRoutes');  

const app = express();

app.use(express.json());

app.use('/api', coinRoutes);  

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_db';  
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to local database: crypto_db`);
    const PORT = process.env.PORT || 3000;  
    app.listen(PORT, () => {  
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(`Error connecting to the database: ${err}`));