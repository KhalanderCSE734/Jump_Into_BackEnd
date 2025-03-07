/*

1.) First Step 'npm init -y'
2.) Then install 'npm i express' (npm i express@latest)
3.) Install nodemon 'npm i nodemon' (npm i nodemon@latest)

const http = require("http");

const myServer = http.createServer((req,res)=>{
    // console.log("Request is Recived from from the uer to SERVER");
    console.log(req.headers);
    console.log(req.socket.remoteAddress);          // These things also comes in console here itself (After refreshing browser)
    res.end("Response has been sent");
})

const PORT = 5000;

myServer.listen(PORT,()=>{
    console.log("Server has Been Started");
})


*/






/*
*                Storing Logs Of User When He Sends The Request To Browser

// const http = require("http");
// import http from 'http';
// import fs from 'fs';
// import path from 'path';
const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"log.txt");


const myServer = http.createServer((req,res)=>{
    // console.log("Request is Recived from from the uer to SERVER");
    // console.log(req.headers);
    // console.log(req.socket.remoteAddress);
    const userIP = req.socket.remoteAddress;
    const date = new Date();
    fs.appendFile(filePath,`${date}:- Request from ${userIP} Recived\n`,(error,data)=>{
        res.end("Response has been sent");
    });
    
})

const PORT = 5000;

myServer.listen(PORT,()=>{
    console.log("Server has Been Started");
})

*/



/*


// const http = require("http");
// import http from 'http';
// import fs from 'fs';
// import path from 'path';
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname,"log.txt");


const myServer = http.createServer((req,res)=>{
    // console.log("Request is Recived from from the uer to SERVER");
    // console.log(req.headers);
    // console.log(req.socket.remoteAddress);
    const userIP = req.socket.remoteAddress;
    const date = new Date();
    fs.appendFile(filePath,`${date}:- Request from ${userIP} (IP) Recived\n`).then((data)=>{
        console.log("Data Added Succesfully");
    }).catch((error)=>{
        console.log("Error Occured");
    })
    res.end("User Noted Down");
})

const PORT = 5000;

myServer.listen(PORT,()=>{
    console.log("Server has Been Started");
})


*/





/*
*                                   Learn The Routings

const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,'log.txt');

const myServer = http.createServer((req,res)=>{
    const userIP = req.socket.remoteAddress;
    const date = new Date();
    const url = req.url;            // It tells where the user is standing (url Path of the webPage)
    fs.appendFile(filePath,`${date}:- Request has been recieved from ${userIP} from ${url} page\n`,(error,data)=>{
        if(error){
            console.log(`${error} Occured`);
        } else{
            // console.log(data);
            switch(url){
                case '/':
                    res.end(`User ${userIP} is in Home Page`);
                    break;
                case '/about':
                    res.end(`User ${userIP} is in About Page`);
                    break;
                case '/contact':
                    res.end(`User ${userIP} is in Contact Page`);
                    break;
                case '/products':
                    res.end(`User ${userIP} is in Products Page`);
                    break;
                default :
                    res.end("404 Error Not Fount");
            }
        }
    });
})

const PORT = 8000;

myServer.listen(PORT,()=>{
    console.log("Server has been started");
})


*/



/*

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");



const filePath = path.join(__dirname,"log.txt");

const myServer = http.createServer((req,res)=>{
    const date = new Date();
    const userIP = req.socket.remoteAddress;
    let myUrl = req.url;
    // if(url==='/favicon.ico'){
    //     res.end();
    // }
    console.log(url);
    // console.log(url.parse(myUrl));
    // myUrl = url.parse(myUrl);
    myUrl = url.parse(myUrl,true);      // Here 'true' separates the Query Parameters which are parsed
    console.log(myUrl);
    if(myUrl.path!=='/favicon.ico'){
        console.log(myUrl);
    }

    fs.appendFile(filePath,`${date}:- Request has been Recieved from ${userIP} to ${myUrl.path}\n`,(err,data)=>{
        if(err){
            return res.end("Error occured");
        }
        // Trying to use the URL package
    switch(myUrl.pathname){
        case '/':
            res.end(`User ${userIP} is in Home Page `);
            break;
        case '/about':
            res.end(`User ${userIP} is in About Page\n Hello ${myUrl.query.name}`);
            break;
        case '/products':
            res.end(`User ${userIP} is in Products Page`);
            break;
        case '/contact':
            res.end(`User ${userIP} is in Contact Page`);
            break;
        case '/search':
            console.log(myUrl.query.question);
            res.end(`Your Search Results for ${myUrl.query.question}`);
            break;
        default:
            res.end("404 Page Not Found");
            break;
    }
        
    });
})

myServer.listen(8000,()=>{
    console.log("Server Has Been Started");
})



*/

