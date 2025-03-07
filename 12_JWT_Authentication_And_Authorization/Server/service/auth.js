const jwt = require("jsonwebtoken");

const secret = "NobodyGuess@khalander$7833";

const setUser = (user)=>{
    const payLoad = {
        "_id":user._id,
        "email":user.email,
        "user":user
    }
    console.log("Token Generated",jwt.sign(payLoad,secret));
    return jwt.sign(payLoad,secret);
    // return jwt.sign(payLoad,secret,{
    // expriesIn:"1h"});
    /**
     *      --------------------------------------
.           | Duration |	Value for expiresIn  |
.           --------------------------------------
.           | 1 Hour   |	"1h"                 |
.           | 1 Day	   |    "1d"                 |
.           | 1 Week   |	"7d"                 |
.           | 1 Month  |	"30d"                |
.           | 1 Year   |	"365d"               |
.           --------------------------------------
     */
}

// const getUser = (id)=>{
//     console.log(sessionIdToSUserMap);
//     return sessionIdToSUserMap.get(id);
// }

const getUser = (token)=>{
    console.log("Token Recieved",token);
    if(!token){
        return null;
    } 
    console.log("user",jwt.verify(token,secret));
    return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getUser
}




/**
 * 
 */