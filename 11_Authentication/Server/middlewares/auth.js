const {getUser} = require('../service/auth')

const restrictToLoggedInUserOnly = async(req,res,next)=>{
    // console.log("Request body",req);

    const userSessionId = req.cookies.uid; // 'uid' we have only set    (Here we need to import 'cookie-parser' package)
    console.log("Cookies",req.cookies);
    if(!userSessionId){
        return res.redirect('/signup');          // This check condition is for (If nobody is there logged in)
    } 

    const user = getUser(userSessionId);
    // console.log(getUser(userSessionId));
    if(!user){
        return res.redirect('/login');          // This thing if that user is not found in map
    }

    req.user = user;
    next();
}



const checkAuth = async(req,res,next)=>{
    const userSessionId = req.cookies.uid;
    const user = getUser(userSessionId);
    req.user = user;
    next();
}


module.exports ={
    restrictToLoggedInUserOnly,
    checkAuth,
};