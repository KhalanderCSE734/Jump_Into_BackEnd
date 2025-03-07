/**
 * How to Use EJS
 * 1.) install - npm i ejs@latest
 * 2.) We have to Set view engine in index.js by telling (app.est("view engine","ejs"))
 * 3.) Then create View Folder then 'ejs' files in that and write html there (basically 'ejs')
 * 4.) We have to Set views in index.js by telling (app.set("views",path.resolve("./views")))
 * 5.) Afterwards Instead of rendering hanldeGetAllUrls in url/ (get Request Page) change it to 
 *      res.render('home') (Instead of 'res.send' or 'res.json') And we can Even Pass the variables
 * 6.) For Front-End Routers We Use Static Routers(Inside 'router' folder)
 * 
 * 
 * -----> Create Static Router in 'router' folder (These are UI routes)
 */




const express = require("express");
const router = require("./routes/url");
const path = require("path");       // Require This
const connectMongoDB = require("./connection") 
const {handleGetUrlShort} = require("./controllers/url"); 
const {handleHomeRoute} = require("./controllers/home");
const dotenv=require("dotenv");
const URL = require("./models/url")
const staticRoute = require("./routes/staticRouter");
dotenv.config();
const app = express();
const PORT = 8000;


/** 
 connectMongoDB("mongodb://127.0.0.1:27017/URL_SHORTENER").then(()=>{            //mongodb://localhost:27017/URL_SHORTENER
 console.log("MongoDB Connected Successfully");
})
* 
*/



/** ejs part */

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.urlencoded({ extended:false }));


// app.get("/",handleHomeRoute);


/**                                      // EJS
 * 
 * 
.                app.get("/",(req,res)=>{
.                   res.render("home");        
.                })

* 
*/

/**                                     // EJS     
 * 
 * 
 * 
 app.get("/",async(req,res)=>{
    const allUrls = await URL.find();
    res.render("home",{
        urls:allUrls,
        name:"Mohammed Khalander"
    })
})



.                                   EJS code in home.ejs in Views page (urls is passed as argument in route (res.render))

 <!--
    
    <h1>Hello From Server - EJS</h1>
    <% urls.forEach((url)=>{    %>
    <li> <%= url.shortId %> </li>
    <%  })  %>

    -->







* 
*/

app.use("/",staticRoute);


app.get("/example/:shortId",handleGetUrlShort);


app.use("/url",router);


app.listen(PORT,()=>{
    console.log(`SERVER started at ${PORT}`);
    connectMongoDB();
})

