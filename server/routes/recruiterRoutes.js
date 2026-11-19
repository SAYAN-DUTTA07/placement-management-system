const express = require("express");
const router = express.Router();

const {
  getDashboardStats
} = require("../controllers/recruiterController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

router.get(
  "/stats",
  protect,
  authorize("recruiter"),
  getDashboardStats
);

module.exports = router;