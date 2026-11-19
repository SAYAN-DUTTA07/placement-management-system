const express = require("express");
const router = express.Router();

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplications,
  getApplicantsByJob,
  updateApplicationStatus,
  getMyApplications
} = require("../controllers/applicationController");

router.post(
  "/",
  protect,
  applyJob
);

router.get(
  "/myapplications",
  protect,
  authorize("student"),
  getMyApplications
);

router.get(
  "/",
  protect,
  getApplications
);

router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getApplicantsByJob
);

router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateApplicationStatus
);

module.exports = router;