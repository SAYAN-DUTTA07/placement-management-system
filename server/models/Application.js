const mongoose=require("mongoose");

const applicationSchema=new mongoose.Schema({

student:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

job:{
type:mongoose.Schema.Types.ObjectId,
ref:"Job"
},

status:{
type:String,
enum:[
"Applied",
"Shortlisted",
"Interview Scheduled",
"Selected",
"Rejected"
],
default:"Applied"
}

},{
timestamps:true
});

module.exports=mongoose.model("Application",applicationSchema);