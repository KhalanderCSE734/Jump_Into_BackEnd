const {User} = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const dbUsers = await User.find();
  res.send(dbUsers);
};

const handleCreateUser = async(req,res)=>{
    const fName = req.body.firstName;    
    const lName = req.body.lastName;
    const mail = req.body.email;
    const gender = req.body.gender;
    const job = req.body.jobTitle;
    console.log(req.body);
    if(!fName || !lName || !mail || !gender || !job){
        return res.status(400).json({message:"All Fields are Mandatory"});
    }

    const person = User.create({    
        firstName:fName,
        lastName:lName,
        email:mail,
        gender:gender,
        jobTitle:job
    })
    console.log(person);
    person.then((data)=>{
        console.log("Successfully Created");
        console.log(data);
        console.log(person);
        return res.status(201).json({message:"Successfully Created",id:data._id});
    }).catch((err)=>{
        if(err.code==11000){
            console.log("Found Duplicate Entry");
            console.log(person);
            return res.status(400).json({message:"Duplicate Fields are now allowed"});
        }
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error"});
    })

}

const handleGetUserById = async (req, res) => {
  try {
    const person = await User.findById(req.params.id);
    if(!person){
        return res.status(404).json({error:"User Not Found"});
    }
    return res.json(person);
  } catch (error) {
    return res.status(400).json({ msg: "User Not Found" });
  }
};


const handleUpdateUserByMail = async(req,res)=>{
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

}
const handleDeleteUserByMail = async(req,res)=>{
    const mail = req.params.mail;
    try{
        await User.findOneAndDelete({email:mail});
        return res.json({message:"Successfully Deleted"});
    }catch(error){
        console.log(error);
        res.send({msg:"Code Exited With Error"});
    }
}



module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserByMail,
  handleDeleteUserByMail
};
