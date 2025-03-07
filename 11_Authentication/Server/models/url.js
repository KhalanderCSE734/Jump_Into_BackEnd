const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  redirectUrl:{
    type:String,
    required:true
  },
  shortId:{
    type:String,
    required:true,
    unique:true
  },
  visitHistory:[ { timestamp:{ type:Number } } ],
  createdBy:{           
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
  }
},{ timestamps:true });

const URL = mongoose.model("url",urlSchema);

module.exports = URL;


// Here 'createdBy' is referring to the 'url' 'model'