const express = require("express");
const router = express.Router();

const {
  createCompany,
  getMyCompany
} = require("../controllers/companyController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

// Create Company
router.post(
  "/",
  protect,
  authorize("recruiter"),
  createCompany
);

// Get Recruiter's Company
router.get(
  "/mycompany",
  protect,
  authorize("recruiter"),
  getMyCompany
);

module.exports = router;