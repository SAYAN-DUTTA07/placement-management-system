const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
resume: {
  type: String,
  default: ""
},
cgpa: {
    type: Number,
    required: true
},

branch: {
    type: String,
    required: true
},

passoutYear: {
    type: Number,
    required: true
},

studentId:String,

backlogs:Number,

skills:[String],

projects:[String],

},{
timestamps:true
});

module.exports=mongoose.model("Student",studentSchema);