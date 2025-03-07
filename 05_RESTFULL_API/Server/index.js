/**
 *                                                              Notes (REST API)
 * When There's a GET request on User then List all The Users
  ->                            GET /Users              ---- Render the HTML document
  ->                            GET /api/Users              ---- Render the JSON Data which can be used in React or somewhere
 * And for Particulars like         GET /Users/1                ----- Get the Data of the user with ID 1
   -                                GET /Users/2                ----- Get the Data of the user with ID 2    
 * When We have a POST request on users Then We'll Create New User          POST /Users 
 * We'll have PATCH route when User can Edit there Detail                   PATCH/Users/1 or PATCH/Users/2 and so on
 * We'll have DELETE route where User can Delete their detail               DELETE/Users/1 or Delete/Users/2 and so on 
 * 
 * 
 *                                  We can get the Raw data from (hard coded) mocakroo.com
 * 
 */

//                                          1st Part
/**
   * 
 


 const express = require("express");
 const usersData = require("./MOCK_DATA.json");




const app = express();
const PORT = 8000;



app.get('/',(req,res)=>{
    res.send("Hello There");
})

app.get('/api/users',(req,res)=>{
    // return res.send(usersData)
    return res.json(usersData)          // Both Can be done
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = usersData.find((cur)=>{
        return cur.id == id;
    })
    if(!user){
        return res.send("User Not Found");
    }
    res.send(user);
})


app.get('/users',(req,res)=>{
    const htmlData = `
        <ul>
            ${
                usersData.map((cur)=>{
                    return  `
                        <li> Name: ${cur.first_name}_${cur.last_name} </li>
                        <li> Gender: ${cur.gender} </li>
                        <li> Mail: ${cur.email}  </li>
                        <li> Job: ${cur.job_title}   </li>
                    `
                })              // .join("")
            }
        </ul>
    `;
    res.send(htmlData);// Here we are getting extra commas because we haven't joined them(Basically We haven't converted them to string)
})                                              // This is SSR


//                                                  Dynamic Routes

app.get('/users/:id',(req,res)=>{               // :id --> dynamic variable
    let id = req.params.id;
    id = Number(id);
    let user = usersData.filter((cur)=>{
        return cur.id==id;
    })         // As 'Filter' method returns an array, use 'Find' method which returns element inside the arrayd (Here object basically)
    // console.log(user);
    user = usersData.find((cur)=>{
        return cur.id == id;
    })

    if(!user){
        return res.send("User Not Found");
    }

    let html = `
        <ul>
            <li> ${user.first_name}_${user.last_name} </li>
            <li> ${user.gender} </li>
            <li> ${user.email} </li>
            <li> ${user.job_title} </li>
        </ul>
    `;
    res.send(html);
})



//                                             We can't do the following methods in Browser  (POST,PUT,PATCH,DELETE) without front-end
app.post('api/users',(req,res)=>{
    // Create the New user here
    return res.send({status:"Pending"});
})

app.patch('api/users/:id',(req,res)=>{
    // Edit the user Data
    res.send({status:"Pending"});
})

app.delete('api/users/:id',(req,res)=>{
    //Delete teh user With the specified ID
    res.send({status:"Pending"});
})

// The above two routes of 'delete' and 'patch' are done one same route but they are repeated so what we can do is 

app.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = usersData.find((cur)=>{
        return cur.id == id;
    })
    res.send(user);
})
.patch((req,res)=>{
    // Edit the user Data
    res.send({status:"Pending"});
})
.delete((req,res)=>{
    //Delete teh user With the specified ID
    res.send({status:"Pending"});    
})


app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
})

  * 
   */

//                                  POSTMAN                 (Last Part)

/**
 * 
 * 

const express = require("express");
const userData = require("./MOCK_DATA.json");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname,"MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended:false }));

app.get("/",(req,res)=>{
    res.send("Welcome To RestFull API");
})

app.get("/api/users",(req,res)=>{
    res.send(userData);
})

app.get("/api/users/:id",(req,res)=>{
    const user = userData.find((cur)=>{
        return cur.id == req.params.id;
    })
    if(!user){
        return res.send("User NOT Found");
    }
    return res.send(user);
})
 
app.post("/api/users",(req,res)=>{
//    console.log(req.body);         // In order to do this we should use 'MIDDLEwares' // And Here MiddleWares add the 'body' to the request object
    const newUser = req.body;
 // We can't pass JS object to write into file (We should Only pass String)
    userData.push({...req.body,"id":userData.length+1});
    fs.writeFile(filePath,JSON.stringify(userData)).then((data)=>{        
        console.log("New User Added");
        return res.json({status:"Completed","id":userData.length});
    }).catch((err)=>{
        console.log("There Was an Error",err);
        return res.json({"Status":"Error"});
    })
    
    // res.json({status:"Pending"});        // Here We should Use 'res.json' only 
})

app.patch("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    // console.log(req.body);
    const index = userData.findIndex((cur)=>{
        return cur.id == id;
    })
    if(index==-1){
        return res.end("User Not Found");
    }

    userData[index] = {...userData[index],...req.body};         // POWER of SPREAD OPERATOR
    fs.writeFile(filePath,JSON.stringify(userData)).then((data)=>{
        return res.json({Status:"SuccessFully Edited"});
    }).catch((err)=>{
        return res.json({Status:"Terminated With Error"});
    })


})

app.delete("/api/users/:id",(req,res)=>{
    
    const newUsers = userData.filter((cur)=>{
        return cur.id != req.params.id;
    })

    fs.writeFile(filePath,JSON.stringify(newUsers)).then((data)=>{
        return res.json({Status:"Successfully Deleted",id:req.params.id});
    }).catch((err)=>{
        return res.json({Status:"Terminated With Error",Error:err});
    })

    
})




app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);
})



* 
*/
