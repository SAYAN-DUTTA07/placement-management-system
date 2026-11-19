const Application = require("../models/Application");
const Student = require("../models/Student");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Job = require("../models/Job");

// ======================
// Apply Job
// ======================

exports.applyJob = async (req, res) => {

    try {

        const student = await Student.findOne({
            user: req.user.id
        });

        if (!student) {

            return res.status(404).json({
                message: "Student profile not found"
            });

        }

        const job = await Job.findById(req.body.job);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        // Already Applied

        const alreadyApplied = await Application.findOne({

            student: student._id,

            job: req.body.job

        });

        if (alreadyApplied) {

            return res.status(400).json({
                message: "Already Applied"
            });

        }

        // CGPA Check

        if (student.cgpa < job.minCGPA) {

            return res.status(400).json({

                message: `Minimum CGPA required is ${job.minCGPA}`

            });

        }

        // Branch Check

        if (!job.branches.includes(student.branch)) {

            return res.status(400).json({

                message: "Your branch is not eligible."

            });

        }

        // Passout Year Check

        if (student.passoutYear !== job.passoutYear) {

            return res.status(400).json({

                message: "Passout year does not match."

            });

        }

        const application = await Application.create({

            student: student._id,

            job: req.body.job

        });

        res.status(201).json(application);

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

};



// ======================
// Logged In Student Applications
// ======================

exports.getApplications = async (req, res) => {

  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    const applications = await Application.find({
      student: student._id
    })
      .populate({
        path: "job",
        populate: {
          path: "company"
        }
      });

    res.json(applications);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// ======================
// Recruiter View Applicants
// ======================

exports.getApplicantsByJob = async (req, res) => {

  try {

    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .populate({
        path: "job",
        populate: {
          path: "company"
        }
      });

    res.json(applications);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// ======================
// Update Status
// ======================

exports.updateApplicationStatus = async (req, res) => {

  try {

    const application = await Application.findById(req.params.id)
      .populate({
        path: "student",
        populate: {
          path: "user"
        }
      })
      .populate({
        path: "job",
        populate: {
          path: "company",
          populate: {
            path: "createdBy",
            select: "_id"
          }
        }
      });

    // Check if application exists

    if (!application) {

      return res.status(404).json({
        message: "Application not found"
      });

    }

    // Ensure recruiter owns this job

    if (
      application.job.company.createdBy.toString() !== req.user.id
    ) {

      return res.status(403).json({
        message: "Unauthorized"
      });

    }

    const oldStatus = application.status;

    // Don't update if status hasn't changed

    if (oldStatus === req.body.status) {

      return res.json({
        message: "Application status is already up to date.",
        application
      });

    }

    application.status = req.body.status;

    await application.save();

    const studentUser = application.student.user;

    const companyName = application.job.company.companyName;

    const role = application.job.role;

    let message = "";

    switch (application.status) {

      case "Shortlisted":

        message =
          `Hello ${studentUser.name},

Congratulations!

You have been shortlisted for the role of ${role} at ${companyName}.

Please wait for further updates.

Regards,
Placement Cell`;

        break;

      case "Interview Scheduled":

        message =
          `Hello ${studentUser.name},

Your interview has been scheduled for the role of ${role} at ${companyName}.

Please login to the Placement Portal to view the interview details.

Best of luck!

Placement Cell`;

        break;

      case "Selected":

        message =
          `Congratulations ${studentUser.name}!

You have been SELECTED for the role of ${role} at ${companyName}.

We wish you a successful career ahead!

Placement Cell`;

        break;

      case "Rejected":

        message =
          `Hello ${studentUser.name},

Thank you for applying for the role of ${role} at ${companyName}.

Unfortunately, you were not selected.

We wish you all the best for future opportunities.

Placement Cell`;

        break;

      default:

        message =
          `Your application status has been updated to "${application.status}".`;

    }

    // Save notification

    await Notification.create({

      user: studentUser._id,

      message: `Your application for ${role} at ${companyName} is now ${application.status}.`

    });

    // Send email

    await sendEmail(

      studentUser.email,

      `Application Status Updated - ${application.status}`,

      message

    );

    res.json({

      message: "Application status updated successfully.",

      application

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: err.message

    });

  }

};



// ======================
// Student Dashboard
// ======================

exports.getMyApplications = async (req, res) => {

    try {

        console.log("==============");
        console.log("USER =", req.user);

        const student = await Student.findOne({
            user: req.user.id
        });

        console.log("STUDENT =", student);

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found"
            });
        }

        const applications = await Application.find({
            student: student._id
        })
        .populate({
            path: "job",
            populate: {
                path: "company"
            }
        });

        console.log("APPLICATIONS =", applications);

        res.json(applications);

    } catch (err) {

        console.log("ERROR");
        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};