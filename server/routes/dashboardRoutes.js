const express = require("express");
const router = express.Router();

const {
  getStudentDashboard,
  getRecruiterDashboard,
  getAdminDashboard
} = require("../controllers/dashboardController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentDashboard
);

router.get(
  "/recruiter",
  protect,
  authorize("recruiter"),
  getRecruiterDashboard
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAdminDashboard
);

module.exports = router;