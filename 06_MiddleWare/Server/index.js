const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 8000;

// MiddleWares

/**
 *                      What is Middleware in Node.js?
 * 
*   --> Middleware is a function that executes during the lifecycle of a request to the server.
*   --> It has access to the request object (req), the response object (res), and the next middleware in the application's   
*       request-response cycle.
*             -->  Middleware functions are primarily used for:
*
*                    * Executing code.
*                    * Modifying the request and response objects.
*                    * Ending the request-response cycle.
*                    * Calling the next middleware in the stack. 
                    
              
*              --> Middleware in the Request-Response Cycle
*                       --> Imagine this as a pipeline:
*                              (Client) Request → Middleware 1 → Middleware 2 → Middleware 3 → Response (Server) (Sent Back To Client)
*                               
*                       --> Each middleware decides whether to:
*                           Process the request further.
*                           Stop and respond.
*                           Modify the request/response along the way.
 */


//          The following is the middleware used in Previous CURD project
//              *   app.use(express.urlencoded({ extended:false }));

// The above function calls next thing and it will go to the further 'MiddleWaress' (If any) or to the Further Routes

/**                                 Defining our OWN MIDDLEWARES                                        */

app.use((req,res,next)=>{
    console.log("This is MiddleWare 1");    // Until This calls 'next' function. Further Part of the Code won't execute
    // res.json({status:"Middle Ware 1"});     // If we end the response here Further Routes won't execute
    next();                                     // By Calling 'next(); function we can execute further MiddleWares or Routes
})

app.use((req,res,next)=>{
    console.log("This is MiddleWare 2");        //MiddleWares can Change the 'req' and 'res' objects which Can even be accessed by furthere middleWares or routes Ex:- The MiddleWares which we used previously was passing the property of 'body' in req object which is 'req.body', so we were able to use the object in Patch and Delete Routes
    next();
})


// app.get("/",(req,res)=>{
//     res.send(`<h1>Learning MiddleWares</h1>`)
// })




app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);
})



/**                                                    HTTP Header and STATUS CODE
 *                  Definition and all Refer the Images inside Public Folder
 *          We have "HEADERS" for both 'req' and 'res'
 *      WE can Check Headers in POSTMAN and We can Even Create our Own Headers
 *      One of the Headers is 'content-type' Which tells which type of content it is for Example 'json', because of which POSTMAN 
 .      understands which type of data it is

 */

const userData = require("../../05RESTFULL_API/Server/MOCK_DATA.json");

app.get("/api/users",(req,res)=>{
    // res.setHeader("MyName","Mohammed_Khalander");           // Adding the Custom Headers
    // console.log(req.headers);
    // res.setHeader("X-MyName","Mohammed Khalander");
    // Best Practises is, for Custom Headers we need to add 'X-' as Pre-fix (We have 'Built-in' Header and 'Custom' Header)
    res.send(userData);
})


/**                                                    HTTP STATUS CODE
 * 
 *              HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are 
 *              grouped in five classes:

*                                        Informational responses (100 – 199)
*                                        Successful responses (200 – 299)
*                                        Redirection messages (300 – 399)
*                                        Client error responses (400 – 499)
*                                        Server error responses (500 – 599)


*                           Go and Refer Here :-  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

*/

app.get("/",(req,res)=>{
    console.log(res.statusCode);
    return res.status(200).send("<h1> Learning Status Code </h1>");
})

app.use(express.urlencoded({ extended:false }));


app.post("/api/users",(req,res)=>{
    // Code for User Creation
    if(!req.body || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.job_title){
        return res.status(400).send("All the Fields are Mandatory");
    }
    res.status(201).send({Status:"SuccessFully Created a New User"});
})