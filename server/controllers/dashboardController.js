const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");
const Student = require("../models/Student");

// ======================
// Student Dashboard
// ======================

exports.getStudentDashboard = async (req, res) => {

  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const totalApplications = await Application.countDocuments({
      student: student._id
    });

    const pending = await Application.countDocuments({
      student: student._id,
      status: "Pending"
    });

    const selected = await Application.countDocuments({
      student: student._id,
      status: "Selected"
    });

    const rejected = await Application.countDocuments({
      student: student._id,
      status: "Rejected"
    });

    const interviews = await Interview.countDocuments({
      student: student._id
    });

    res.json({
      totalApplications,
      pending,
      selected,
      rejected,
      interviews
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// ======================
// Recruiter Dashboard
// ======================

exports.getRecruiterDashboard = async (req, res) => {

  try {

    const jobs = await Job.find({
      recruiter: req.user.id
    });

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds }
    });

    const interviews = await Interview.find({
      recruiter: req.user.id
    });

    const selected = applications.filter(
      app => app.status === "Selected"
    );

    res.json({

      totalJobs: jobs.length,

      totalApplications: applications.length,

      interviews: interviews.length,

      selected: selected.length,

      applications

    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// ======================
// Admin Dashboard
// ======================

exports.getAdminDashboard = async (req, res) => {

  try {

    const totalStudents = await Student.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const totalInterviews = await Interview.countDocuments();

    const selectedStudents = await Application.countDocuments({
      status: "Selected"
    });

    res.json({

      totalStudents,

      totalJobs,

      totalApplications,

      totalInterviews,

      selectedStudents

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};