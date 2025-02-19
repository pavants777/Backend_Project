const mongoose = require('mongoose');

const connectDB = async () => {
     await mongoose.connect(process.env.DB).then(()=>{
        console.log('MongoDB Connected');
     }).catch((error)=>{
        console.log(`MongoDB connection fails ${error}`);
        process.exit(1);
     })
}

module.exports = connectDB;