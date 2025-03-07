/**
 * URL SHORTENER

--> It takes a valid URL and returns a shortner URL, redirecting the user to the previously provided URL
--> Keep track of total visits(clicks) on the URL
--> Routes
.        * POST /URL :-  It should generate the URL and returns the shortened URL in the format (example.com/random-it) 
.        * GET  /:id :-  Redirects to the original URL
.        * GET /URL/analytics/:id  :- Returns the clicks for the provided short id. 

*/


const express = require("express");
const router = require("./routes/url");
const connectMongoDB = require("./connection") 
const {handleGetUrlShort} = require("./controllers/url"); 
const {handleHomeRoute} = require("./controllers/home");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/URL_SHORTENER").then(()=>{            //mongodb://localhost:27017/URL_SHORTENER
    console.log("MongoDB Connected Successfully");
})


app.use(express.json());        // MiddleWare to support JSON data (POST Request)
app.use(express.urlencoded({ extended:false }));


app.get("/",handleHomeRoute);


app.get("/example/:shortId",handleGetUrlShort);


app.use("/url",router);


app.listen(PORT,()=>{
    console.log(`SERVER started at ${PORT}`);
})

