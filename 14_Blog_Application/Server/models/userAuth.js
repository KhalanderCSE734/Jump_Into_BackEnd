const {createHmac,randomBytes} = require("crypto");// To Create Salt
const {createToken,validateToken} = require("../service/auth");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
    },
    profileImgUrl:{
        type:String,
        default:"/Images/defaultUser.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{ timestamps:true });



// Creating a Salt (For Password) for USER

userSchema.pre('save', function (next){
    const user = this;
    if(!user.isModified("password")){
        return;
    }
    const salt = randomBytes(16).toString();    // It'll generate the random string 
    // const salt = "mohammed@Khalander$789"
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");  // Here 'sha256' is algorithm used for salting and '.update' specifies that we are updating the mentioned things in that

    this.salt = salt;
    this.password = hashedPassword;
    next();
} )

// Unsalting the password for 'Login' purpose

userSchema.static("matchPasswordAndGenerateToken", async function (email,password){
    const user = await this.findOne({email});
    console.log(user);
    if(!user) return "User Not Found";

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256",salt).update(password).digest("hex");

    // return hashedPassword === userProvidedHash;
    if(hashedPassword !== userProvidedHash){
        return "Incorrect Password";
    }
    const token = createToken(user);
    return token;
})

 

const User = mongoose.model("user",userSchema)

module.exports = User

