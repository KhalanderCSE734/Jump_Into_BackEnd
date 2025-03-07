/**
 * 
 *   -->In this Folder 'JWT'(JSON WEB TOKENS)('jwt.io')  has been utilised instead of last setting 'cookie' and map method
 *   --> We can go to 'jwt.io' and try creatign tokens and refreshing and pasting the token and checking the value
 *   --> For this the library is 'jwt-token' (npm i jsonwebtoken)
 *   
 * 
 * 
 */

 



const express = require("express");
const path = require("path");       // Require This
const cookieParser = require("cookie-parser");

const {handleGetUrlShort} = require("./controllers/url"); 
const {handleHomeRoute} = require("./controllers/home");
const { restrictToLoggedInUserOnly,checkAuth } = require("./middlewares/auth");


const URL = require("./models/url")
const connectMongoDB = require("./connection") 


const staticRoute = require("./routes/staticRouter");
const router = require("./routes/url");
const userRouter = require("./routes/user");



const app = express();
const PORT = 8000;



 connectMongoDB("mongodb://127.0.0.1:27017/URL_SHORTENER").then(()=>{     
 console.log("MongoDB Connected Successfully");
})



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());


app.use("/",staticRoute);


app.get("/example/:shortId",handleGetUrlShort);


app.use("/url",restrictToLoggedInUserOnly,router); 


app.use("/user",userRouter);



app.listen(PORT,()=>{
    console.log(`SERVER started at ${PORT}`);
})
