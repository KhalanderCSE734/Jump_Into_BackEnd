const User = require("../models/userAuth")

const handleSignup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name||!email||!password){
            return res.render("signup",{
                err:"All Fields Are Mandatory"
            })
        }
        // console.log(name,email,password);
        const createUser = await User.create({
            fullName:name,
            email:email,
            password:password,
        });
        // console.log(createUser);
        return res.render("login");
    }catch(err){
        console.log("Error is ",err.message);
        if(err.code===11000){
            res.render("signup",{
                err:"Mail Already Exists Please LogIn to Continue",
            })
        }
    }
}



const handleLogin = async(req,res)=>{
    const {email,password} = req.body;
    const userToken = await User.matchPasswordAndGenerateToken(email,password);
    // console.log(userToken);
    if(userToken=="User Not Found"){
        return res.render("signup",{
            msg:"User Not Found, Signup To access the Website",
        });
    } 
    if(userToken=="Incorrect Password"){
        return res.render("login",{
            msg:"Incorrect Password"
        })
    }
    res.cookie("token",userToken);

    // console.log("Login Cookie",req.cookies.token);
    return res.render("home",{
        logIn:req.body.name
    });
}

const handleLogOut = async(req,res)=>{
    try{

        res.clearCookie("token");
        res.redirect("/");
    }catch(err){
        console.log("LogoutError",err);
        res.redirect("/");
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleLogOut
}