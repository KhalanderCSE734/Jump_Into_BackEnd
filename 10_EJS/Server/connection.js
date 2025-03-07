const mongoose = require("mongoose");

// const connectMongoDB = async(url)=>{
//     return mongoose.connect(url); 
// }

// module.exports = connectMongoDB;

const connectMongoDB = async()=>{
    try{
        const connections = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfullly");
    }catch(err){
        console.log("Exited with error",err);
        console.log("Error message",err.message);
    }
}

module.exports = connectMongoDB;