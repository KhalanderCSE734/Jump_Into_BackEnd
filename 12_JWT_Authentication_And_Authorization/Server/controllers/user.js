const User = require("../models/userAuth");
const {setUser} = require('../service/auth')
const { v4: uuidv4 } = require('uuid');     // This is used in order to create 'unique session id' for each user

const handleUserSignup = async(req,res)=>{
    try{
    const {name,email,password} = req.body;
        // Here We Can Do all the validations on 'mail','pass', 'name' and all (But since while creating 'model' we had 'unique true' for some entries that will also maintains little things, but If those were violated then App will crash)
        const user = await User.create({
            name,
            email,
            password
        })
        return res.render("home");
    }catch(err){
        console.log("Signup Error",err);
        return res.render("home");
    }
   
}

const handleUserLogin = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const FindUser = await User.findOne({name,email,password})
        if(!FindUser){
            return res.render("login",{
                err:"Incorrect PassWord or Name or Email"
            })
        }
        // const sessionId = uuidv4();
        // setUser(sessionId,FindUser);        // Mapping the Data in Dictionary 
        const token = setUser(FindUser);
        res.cookie("uid",token);
        /**
         *  res.cookie("authToken", token, {
        .        httpOnly: true,  // Prevents JavaScript access (XSS protection)
        .        secure: true,    // Requires HTTPS
        .        sameSite: "Strict", // Prevents cross-site sending
        .        maxAge: 3600000, // 1 hour expiration
        .        domain: ".example.com" // Makes it accessible on subdomains like app.example.com
        .         });
         */
        /**
         * Duration	Value for maxAge (Milliseconds)
.               |1 Hour   |	3600000    |
.               |1 Day    |	86400000   |
.               |1 Week   |	604800000  |
.               |1 Month  | 2592000000 |
.               |1 Year   |	31536000000|
         */
        return res.redirect("/");
    }catch(err){
        console.log("Login Error",err);
        
    }
}

/**
 *              "LOGOUT CODE"
 *  app.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.send("Logged out successfully");
});
 */


module.exports = {
    handleUserSignup,
    handleUserLogin
}