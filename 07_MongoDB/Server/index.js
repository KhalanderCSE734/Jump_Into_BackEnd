const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = 8000;

// First We need to Connect Our Backend To DataBase

mongoose.connect("mongodb://127.0.0.1:27017/College").then((data)=>{
    console.log("DataBase Successfully Connected");
}).catch((err)=>{
    console.log(`Error In DataBase Connection ${err}`);
})

// Here Above The beginning part is URL pasted From local MongoDB server and further part is DataBase Name 'College' 
// We can Either use Existing DataBase or We can Create new one
// As the Above thing returns promise, we need to handle it properly Either through promises or Async Await


// Now we need To Create Schema For Our DataBase

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
        enum:['Male','Female','Others'] //enum: Restricts values to a specified list.
    },
},
{timestamps:true}
)


// Now We neeed to Create Our Model Using which we should Operate our DataBase throught Node.js
// And this model intern will convert as our 'Collection' in Database

const User = mongoose.model("user",userSchema);








app.get("/",(req,res)=>{
    res.send("<h1> Hello There</h1>");
})


app.get("/api/users", async (req,res)=>{
    const dbUsers = await User.find();      // This will Return an Array only to which we can Map like as usual
    res.send(dbUsers);
})

app.get("/users",async (req,res)=>{
    const dbUsers = await User.find();
    const html = `
        <ul>
            ${
                dbUsers.map((cur)=>{
                    return `
                        <li> Name: ${cur.firstName}_${cur.lastName} </li>
                        <li> Job: ${cur.jobTitle} </li>
                    `
                })
            }
        </ul>
    `
    res.send(html);
})

app.get("/api/users/:id", async (req,res)=>{


    // try{
    //     const person = await User.findById(req.params.id);
    //     return res.send(`${person}`);
    // }catch(error){
    //     return res.status(400).json({msg:"User Not Found"});
    // }
    try{
        const person = await User.findById(req.params.id);
        return res.json(person);
    }catch(error){
        return res.status(400).json({msg:"User Not Found"});
    }
})


// Middleware - Plugin
app.use(express.urlencoded({ extended:false }));



app.post("/api/users", async (req,res)=>{
    const fName = req.body.firstName;      // Here Body object in 'Req' is appended by MiddleWare Because of which we are able to use it
    const lName = req.body.lastName;
    const mail = req.body.email;
    const gender = req.body.gender;
    const job = req.body.jobTitle;
    if(!fName || !lName || !mail || !gender || !job){
        return res.json({message:"All Fields are Mandatory"});
    }

    const person = User.create({    // We can Use Async And Await instead of Promise (And Use Try Catch Block)
        firstName:fName,
        lastName:lName,
        email:mail,
        gender:gender,
        jobTitle:job
    })

    person.then((data)=>{
        console.log("Successfully Created");
        return res.status(201).json({message:"Successfully Created"})
    }).catch((err)=>{
        if(err.code==11000){
            console.log("Found Duplicate Entry");
            return res.status(400).json({message:"Duplicate Fields are now allowed"});
        }
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error"});
    })



})

app.patch("/api/users/:mail", async (req,res)=>{
    // Here Instead of Updating by Id We'll do it by 'E-mail' 

    const updatedData  = req.body;

    try{
        const dbUpdate = await User.findOneAndUpdate(
            { email:req.params.mail },
            { $set: updatedData },
            {new:true}
        )       // Here 'new:true' will set the 'dbUpdate' value to newly updated value (Nothing else)
        if(!dbUpdate){
            return res.status(400).json({msg:"User Not Found"});
        }
        console.log(dbUpdate);
        res.status(200).json({message:"Successfully Edited"});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"Server Error"});
    }

})

app.delete("/api/users/:mail", async (req,res)=>{
    const mail = req.params.mail;
    try{
        await User.findOneAndDelete({email:mail});
        return res.json({message:"Successfully Deleted"});
    }catch(error){
        console.log(error);
        res.send({msg:"Code Exited With Error"});
    }

})



app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);
})



/**                                                          MVC Pattern (Modern View Controller)
 * 
 * ----> 'Controllers' manipulates the 'model'
 * ----> And Modle update the 'View'
 *                                              Broader View in '08_MVC_Pattern' Folder
 */