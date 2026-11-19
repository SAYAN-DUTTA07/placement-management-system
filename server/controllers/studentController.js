const Student=require("../models/Student");

exports.getProfile=async(req,res)=>{

try{

const student=await Student.findOne({
user:req.user.id
});

res.json(student);

}
catch(err){

res.status(500).json(err);
}

};

//Update Profile

exports.updateProfile = async (req, res) => {

  try {

    const student = await Student.findOneAndUpdate(

      { user: req.user.id },

      req.body,

      {
        new: true,
        upsert: true
      }

    );

    res.json(student);

  }
  catch (err) {

    res.status(500).json(err);

  }

};

// Upload Resume

exports.uploadResume = async (req, res) => {

  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file."
      });
    }

    student.resume = `/uploads/resumes/${req.file.filename}`;

    await student.save();

    res.json({
      message: "Resume uploaded successfully",
      resume: student.resume
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};