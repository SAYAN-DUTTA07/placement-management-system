const Interview = require("../models/Interview");
const Student = require("../models/Student");
const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

exports.createInterview = async (req,res)=>{

try{

const interview = await Interview.create({

application:req.body.application,

student:req.body.student,

job:req.body.job,

company:req.body.company,

recruiter:req.user.id,

date:req.body.date,

time:req.body.time,

mode:req.body.mode,

meetingLink:req.body.meetingLink,

venue:req.body.venue,

remarks:req.body.remarks

});

await Application.findByIdAndUpdate(

req.body.application,

{
status:"Interview Scheduled"
}

);

res.status(201).json(interview);

}
catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}

};

exports.getMyInterviews = async (req, res) => {

  try {

    const student = await Student.findOne({

      user: req.user.id

    });

    if (!student) {

      return res.status(404).json({

        message: "Student not found"

      });

    }

    const interviews = await Interview.find({

      student: student._id

    })

    .populate({

      path: "job",

      select: "role",

      populate: {

        path: "company",

        select: "companyName"

      }

    })

    .sort({

      date: 1

    });

    res.json(interviews);

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

exports.getStudents = async (req, res) => {
  try {

    const students = await Student.find()
      .populate("user", "name email");

    res.json(students);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.getJobs = async (req, res) => {

  try {

    const jobs = await Job.find();

    res.json(jobs);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getCompanies = async (req, res) => {

  try {

    const companies = await Company.find();

    res.json(companies);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getRecruiterInterviews = async(req,res)=>{

try{

const interviews = await Interview.find({

recruiter:req.user.id

})

.populate({

path:"student",

populate:{

path:"user",

select:"name email"

}

})

.populate("job")

.populate("company")

.populate("application");

res.json(interviews);

}
catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.updateInterview = async (req, res) => {

  try {

    const interview = await Interview.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json(interview);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.deleteInterview = async (req, res) => {

  try {

    await Interview.findByIdAndDelete(req.params.id);

    res.json({
      message: "Interview Deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};