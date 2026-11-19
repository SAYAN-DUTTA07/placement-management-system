const express = require("express");
const router = express.Router();

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getMyJobs,
  deleteJob,
  updateJob,
  getJobById
} = require("../controllers/jobController");

router.post(
  "/",
  protect,
  authorize("recruiter"),
  createJob
);

router.get(
  "/",
  getJobs
);

router.get(
  "/myjobs",
  protect,
  authorize("recruiter"),
  getMyJobs
);

router.delete(
  "/:id",
  protect,
  authorize("recruiter"),
  deleteJob
);

router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateJob
);

router.get(
  "/:id",
  protect,
  authorize("recruiter"),
  getJobById
);
module.exports = router;