/**
 * 
 * We Totally Have 4 types of HTTP Request
    1.)GET 2.)POST 3.)PUT  4.)DELETE   * PATCH  
    GET:- Whatever Data we are getting from server
    POST:- When we want to mutate the server's data (example:- Form submits or instagram account creation)
    PUT/PATCH:- When we want to update the existing things
    DELETE:- Obvious delete of the existing one
 */



/*
const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname,"log.txt");
const url = require("url");


const date = new Date();



const serverHandler = (req,res)=>{
    if(req.url==="/favicon.ico") return res.end();
    // console.log(req);
    const userIP = req.socket.remoteAddress || req.connection.remoteAddress
    const log = `\n${date}: \n New Request Received \n IP Address is ${userIP} \n ${req.url}\nRequest Method is ${req.method}`;
    const myURL = url.parse(req.url, true);
    // console.log(myURL);
    fs.appendFile(filePath,log,(err,data)=>{
        if(err){
            res.end("Error Occured");
            return;
        }else{
            switch(myURL.pathname){
                case '/':
                    res.end("I'm Home Page");
                    break;
                case '/about':
                    const name = myURL.query.myName;
                    res.end(`Hello ${name}`);
                    break;
                case '/contact':
                    res.end("I'm Contact Page");
                    break;
                case '/blog':
                    res.end("I'm Blog Page");
                    break;
                case '/search':
                    const search = myURL.query.search;
                    res.end(`Your search results for search are ${search}`)    
                    break;
                case '/signup':
                    if(req.method==='GET'){
                        res.end("This is Sign UP and Sign In form");
                        break;
                    } else if(req.method==='POST'){
                        res.end("Sign Up Success")
                    }
                    break;
                default:
                    res.end("404 Page Not Found");
                    break;
            }         
        }

    })
    
}



const myServer = http.createServer(serverHandler);

myServer.listen(8000,()=>{
    console.log("Server Started");
})

*/