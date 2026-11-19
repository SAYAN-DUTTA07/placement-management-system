const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({

companyName:{
type:String,
required:true
},

industry:String,

description:String,

packageOffered:Number,

website:String,

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{
timestamps:true
});

module.exports=mongoose.model("Company",companySchema);