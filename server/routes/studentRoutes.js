const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const studentController = require("../controllers/studentController");

// Get Profile
router.get(
  "/profile",
  protect,
  studentController.getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  studentController.updateProfile
);

// Upload Resume
router.post(
  "/upload-resume",
  protect,
  authorize("student"),
  upload.single("resume"),
  studentController.uploadResume
);

module.exports = router;