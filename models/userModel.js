const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : [true , "Name is Required"],
        
    },
    email : {
         type : String,
         required : [true , "Email is Required"],
         unique: true,
         lowercase: true,
    },
    password: {
        type: String, 
        required: [true, "Password is required"], 
        validate: {
            validator: function (password) {
                return password.length >= 8; 
            },
            message: "Password must be at least 8 characters long" 
        }
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
