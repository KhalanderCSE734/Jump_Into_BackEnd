/*

-----------------------------------------------------------------------------------------------------------
Feature	                 |            res.end     	             |          res.send                       |     
-------------------------|---------------------------------------|-----------------------------------------|                  
Automatic Headers	     |               No 	                 |               Yes                       |         
Response Formatting	     |           Manual (raw data)	         |          Automatic                      |     
Type of Data	         |       Raw string or buffer only	     |   String, object, JSON, or buffer,HTML  | 
Use Case	             |   Simple, low-level responses         |        	High-level, formatted responses|
------------------------------------------------------------------------------------------------------------



*/



/**

/                                        Bascic App in Express
const express = require("express");

const app = express();

app.get("/",(req,res)=>{
   return res.end("You Are in Home Page");
})


app.listen(8000,()=>{
    console.log("Server Has been Started");
})
    

* 
*/

/**

const express = require('express');
const app = express();
const PORT = 8000;

app.get('/',(req,res)=>{
    let html = `
    <h1> Fruits </h1>
    <ul>
        <li>Mango
            <ol>
                <li> Availablel in Summer </li>
                <li> Not in Winter </li>
            </ol>
        </li>
        <li> Apple </li>
        <li> Ball</li>
    </ul>`
    //res.end(html);          // This doesn't render as we want
    res.send(html);           // This renders proper 'HTML' on webpage
})

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})
    
 * 
 */

/**


// "URL" package which we were using is already built-in in 'Express' 

const express = require("express");
const app = express();
const PORT = 8000;

app.get('/',(req,res)=>{
    res.send("Hello There\nThis is Home page");
})

app.get('/about',(req,res)=>{
    if(req.query.name && req.query.age){
        return res.send(`This is About Page Hello ${req.query.name} You are ${req.query.age} Year Old`);
    }
        return res.send(`This is About Page`);
})


app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})

 * 
 */



