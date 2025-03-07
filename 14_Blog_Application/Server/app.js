/**
 *          Inside 'views' folder we use 'partial' folder same as components folder
 *              
 */







require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");


const User = require("./models/userAuth");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const connectMongoDB = require("./connection");

const app = express();
const PORT = process.env.PORT || 8000;


connectMongoDB(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Connected SuccessFully");
}).catch((err)=>{
    console.log("DataBase Connection Errror", err);
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));  //Middleware to use 'public' folder detials in 'ejs' files

app.use("/",staticRouter);
app.use('/user',userRouter);

app.use("/blog",blogRouter);

app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`);
})