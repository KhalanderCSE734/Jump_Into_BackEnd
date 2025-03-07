const JWT = require("jsonwebtoken");

const secret = "$Mohammed$%Khalander-q985348koqnmofk&yeon";

const createToken = (user)=>{
    const payLoad = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImgUrl:user.profileImgUrl,
        role:user.role,
    }
    const token = JWT.sign(payLoad,secret);
    return token;
}

const validateToken = (token)=>{
    if(!token) {
        return null;
    }
    const user = JWT.verify(token,secret);
    return user;
}

module.exports = {
    createToken,
    validateToken,
}