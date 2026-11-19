const express = require("express");
const router = express.Router();

const {
  getStudents,
  getRecruiters,
  getCompanies,
  getJobs,
  getDashboardStats,
  getDepartmentStats,
  getPlacementReport,
  deleteStudent,
  deleteRecruiter,
  deleteCompany,
  deleteJob,
  downloadPlacementPDF
} = require("../controllers/adminController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

// Students
router.get(
  "/students",
  protect,
  authorize("admin"),
  getStudents
);

// Recruiters
router.get(
  "/recruiters",
  protect,
  authorize("admin"),
  getRecruiters
);

// Companies
router.get(
  "/companies",
  protect,
  authorize("admin"),
  getCompanies
);

// Jobs
router.get(
  "/jobs",
  protect,
  authorize("admin"),
  getJobs
);

// Delete Student
router.delete(
  "/student/:id",
  protect,
  authorize("admin"),
  deleteStudent
);

// Delete Recruiter
router.delete(
  "/recruiter/:id",
  protect,
  authorize("admin"),
  deleteRecruiter
);

// Delete Company
router.delete(
  "/company/:id",
  protect,
  authorize("admin"),
  deleteCompany
);

// Delete Job
router.delete(
  "/job/:id",
  protect,
  authorize("admin"),
  deleteJob
);

router.get(
  "/department-stats",
  protect,
  authorize("admin"),
  getDepartmentStats
);

router.get(
  "/placement-report",
  protect,
  authorize("admin"),
  getPlacementReport
);

router.get(
  "/placement-pdf",
  protect,
  authorize("admin"),
  downloadPlacementPDF
);

module.exports = router;