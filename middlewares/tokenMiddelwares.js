const jwt = require("jsonwebtoken");

const tokenMiddelWare =  (req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        res.sendStatus(400).json({"message" : "token validation failed"});
        return;
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "PasswordKey");
        req.user = decoded; 
        next();
    } catch (error) {
        res.sendStatus(400).json({ error: `Invalid token ${error}`});
    }

}

module.exports = tokenMiddelWare;