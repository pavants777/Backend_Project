const express = require('express');
const routes = express.Router();
const emailValidation = require('../middlewares/emailValidator');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const tokenMiddelWare = require('../middlewares/tokenMiddelwares');

routes.post('/signUp',emailValidation,async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const user = new UserModel({ name, email, password });
        await user.save(); 
        const secretKey = process.env.JWT_KEY || "PasswordKey";
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30d' });
        const userWithoutPassword = await UserModel.findById(user._id).select("-password");
        res.status(200).json({message: "Access granted", token , user : userWithoutPassword});
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

routes.get('/validate', tokenMiddelWare , (req,res)=>{
    res.json({ message: "Access granted", user: req.user });
})

routes.post('/login',emailValidation,async(req,res)=>{
    try {
        const {email , password} = req.body;
        const existingUser = await UserModel.findOne({email});

        if(!existingUser){
            return res.status(400).json({error : "Credential is invalid"});
        }

        if(password != existingUser.password){
            return res.status(400).json({error : "Credential is invalid"});
        }
        const secretKey = process.env.JWT_KEY || "PasswordKey";
        const token = jwt.sign({userId : existingUser._id}, secretKey, {expiresIn : '30d'});
        const userWithoutPassword = await UserModel.findById(user._id).select("-password");
        res.status(200).json({message: "Access granted", token , user : userWithoutPassword});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

module.exports = routes;
