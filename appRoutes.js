const express = require('express');
const connectDB = require('./config/dp.connection'); 
const authRoutes = require('./routes/auth'); 
require('dotenv').config();

const app = express();
connectDB(); 
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});


app.use('/api', authRoutes);


module.exports = app; 
