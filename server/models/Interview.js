const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application",
        required:true
    },

    recruiter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    time:{
        type:String,
        required:true
    },

    mode:{
        type:String,
        enum:["Online","Offline"],
        required:true
    },

    meetingLink:String,

    venue:String,

    remarks:String,

    status:{
        type:String,
        default:"Scheduled"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Interview", interviewSchema);