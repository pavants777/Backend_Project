const express = require('express');
const connectDB = require('./config/dp.connection');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());
app.use('/api',authRoutes);
const PORT = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;
