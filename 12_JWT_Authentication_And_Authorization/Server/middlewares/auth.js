const {getUser} = require('../service/auth')

const restrictToLoggedInUserOnly = async(req,res,next)=>{
    // console.log("Request body",req);

    const userSessionId = req.cookies.uid; // 'uid' we have only set    (Here we need to import 'cookie-parser' package)
    console.log("Cookies",req.cookies);
    if(!userSessionId){
        return res.redirect('/signup');          // This check condition is for (If nobody is there logged in)
    } 

    const user = getUser(userSessionId);
    console.log(user);
    // console.log(getUser(userSessionId));
    if(!user){
        return res.redirect('/login');          // This thing if that user is not found in map
    }

    req.user = user;
    next();
}



const checkAuth = async(req,res,next)=>{
    const userSessionId = req.cookies.uid;
    if(!userSessionId){
        return res.redirect('/login');
    }
    const user = getUser(userSessionId);
    console.log("user",user);
    req.user = user;
    next();
}


module.exports ={
    restrictToLoggedInUserOnly,
    checkAuth,
};


/**
 * --> 'Authentication' means that, it is just used to 'log-in' or signup to the website
 * --> Where as 'Authorization' means that, if a user is allowed to use particular part of website or not (For example:- Only Admin has the access to some part of the website (like creating and deleting doctors in doctor application))
 * --> 'Authorization' code part is in '07_Authorization image' and Demonstration is in '08_Admin_Auth_Code'
 * 
 */