const Student = require("../models/Student");
const User = require("../models/User");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("user", "name email");

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all recruiters
exports.getRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({
      role: "recruiter"
    });

    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalRecruiters = await User.countDocuments({
      role: "recruiter"
    });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const selectedStudents = await Application.countDocuments({
      status: "Selected"
    });

    res.json({
      totalStudents,
      totalRecruiters,
      totalCompanies,
      totalJobs,
      totalApplications,
      selectedStudents
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Delete recruiter
exports.deleteRecruiter = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Recruiter deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);

    res.json({
      message: "Company deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getDepartmentStats = async (req, res) => {
  try {
    const data = await Student.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "student",
          as: "applications"
        }
      },
      {
        $unwind: "$applications"
      },
      {
        $match: {
          "applications.status": "Selected"
        }
      },
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1
        }
      }
    ]);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// Placement Report
exports.getPlacementReport = async (req, res) => {

  try {

    const applications = await Application.find({
      status: "Selected"
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

    const report = applications.map(app => ({

      Name: app.student?.user?.name,

      Email: app.student?.user?.email,

      Department: app.student?.department,

      CGPA: app.student?.cgpa,

      Company: app.job?.company?.companyName,

      Job: app.job?.role,

      Status: app.status,

      SelectedOn: app.updatedAt

    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(report);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Placements"
    );

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Placement_Report.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(excelBuffer);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.downloadPlacementPDF = async (req, res) => {
  try {

    const applications = await Application.find({
      status: "Selected"
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

    const doc = new PDFDocument({
      margin: 40,
      size: "A4"
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Placement_Report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("College Placement Report", {
        align: "center"
      });

    doc.moveDown();

    doc.fontSize(12);

    applications.forEach((app, index) => {

      doc.text(`Student : ${app.student.user.name}`);
      doc.text(`Email   : ${app.student.user.email}`);
      doc.text(`Department : ${app.student.department}`);
      doc.text(`CGPA : ${app.student.cgpa}`);
      doc.text(`Company : ${app.job.company.companyName}`);
      doc.text(`Job Role : ${app.job.role}`);
      doc.text(`Status : ${app.status}`);

      doc.moveDown();

      doc.moveTo(40, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

    });

    doc.end();

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};