const express = require("express");
const router = express.Router();

const {handleGetAllUsers,handleGetUserById,handleCreateUser,handleUpdateUserByMail} = require("../controllers/user");
const {handleDeleteUserByMail} = require("../controllers/user");


// Here main route is  'api/users' if anybody request on this route in index.js we'll return the following

// So basically here below '/' means that it is 'api/users/' path and 
//   '/:id' means 'api/users/:id'



/**
 * router.get("/", async (req,res)=>{
    const dbUsers = await User.find();    
    res.send(dbUsers);
})
 */

router.get("/", handleGetAllUsers);

/**
 * router.get("/:id", async (req,res)=>{
    try{
        const person = await User.findById(req.params.id);
        return res.json(person);
    }catch(error){
        return res.status(400).json({msg:"User Not Found"});
    }
})
 */

router.get("/:id", handleGetUserById)


/**
 * 

router.post("/", async (req,res)=>{
    const fName = req.body.firstName;    
    const lName = req.body.lastName;
    const mail = req.body.email;
    const gender = req.body.gender;
    const job = req.body.jobTitle;
    if(!fName || !lName || !mail || !gender || !job){
        return res.json({message:"All Fields are Mandatory"});
    }

    const person = User.create({    
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
 */

router.post("/",handleCreateUser);


/**
 router.patch("/:mail", async (req,res)=>{
    const updatedData  = req.body;
    try{
        const dbUpdate = await User.findOneAndUpdate(
            { email:req.params.mail },
            { $set: updatedData },
            {new:true}
        )  
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
* 
*/


router.patch("/:mail", handleUpdateUserByMail)


/**
 router.delete("/:mail", async (req,res)=>{
    const mail = req.params.mail;
    try{
        await User.findOneAndDelete({email:mail});
        return res.json({message:"Successfully Deleted"});
    }catch(error){
        console.log(error);
        res.send({msg:"Code Exited With Error"});
    }
    
})

* 
*/



router.delete("/:mail", handleDeleteUserByMail);






module.exports = {
    userRouter:router,
}