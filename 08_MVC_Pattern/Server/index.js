/**
 * 1.)npm init -y
 * 2.)npm i express@latest
 * 3.)npm i nodemon@latest
 * 4.)npm i mongoose@latest
 * 5.)Write the scripts in 'package.json' file (for 'nodemon' and ('npm start' if required))
 * 6.)Create the Folders
 /      i)   models     
 /      ii)  controllers
 /      iii) views      
 /      iv)  routes     
 /      v) middlewares
 /      vi) connection.js (file)
 *  ----> 'index.js' will only contain the flow 
 *  ----> 'models' folder will contain all the Models or Schema
 *  ----> 'routes' will contain all the routes
 *  ---->  MongoDb connection will go in 'connection js' file 
 *  ---->  All the middlewares and Log file kaa codes will be in 'middleware' files
 *  ---->  Handlers in the Routes used in route folder will go in separate 'controllers' file
 *  ---->  All the UI related code will be in 'view' folder
 */


const express = require("express");
const path = require('path');
const {userRouter} = require("./MVC_Folders/routes/user");
const {connectMongoDb} = require("./MVC_Folders/connection");
const {logReqRes} = require("./MVC_Folders/middlewares");                //No need to mention 'index.js' as it defaultely fetches that

const app = express();
const PORT = 8000;
const filePath = path.join(__dirname,"log.txt");

connectMongoDb("mongodb://127.0.0.1:27017/College").then(()=>{
    console.log("DataBase Connected SuccessFully");
})



app.use(express.urlencoded({ extended:false }));
app.use(logReqRes(filePath));

app.use("/api/user",userRouter);     // Here It is 'app.use' not 'app.get' or 'app.post'

app.get("/",(req,res)=>{
    res.send(`<h1>Learning MVC Pattern</h1>`)
})

app.use((req,res)=>{
    res.status(404).send(`<h1> 404 Page Not Found </h1>`);
})


app.listen(PORT,()=>{
    console.log("Server Started");
})