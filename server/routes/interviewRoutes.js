const express = require("express");
const router = express.Router();

const {
createInterview,
getMyInterviews,
getStudents,
getJobs,
getCompanies,
getRecruiterInterviews,
updateInterview,
deleteInterview
} = require("../controllers/interviewController");

const {
protect,
authorize
} = require("../middleware/authMiddleware");

router.post(
"/",
protect,
authorize("recruiter"),
createInterview
);

router.get(
"/myinterviews",
protect,
authorize("student"),
getMyInterviews
);

router.get(
"/students",
protect,
authorize("recruiter"),
getStudents
);

router.get(
"/jobs",
protect,
authorize("recruiter"),
getJobs
);

router.get(
"/companies",
protect,
authorize("recruiter"),
getCompanies
);

console.log({
  createInterview,
  getMyInterviews,
  getStudents,
  getJobs,
  getCompanies
});

router.get(
  "/recruiter",
  protect,
  authorize("recruiter"),
  getRecruiterInterviews
);

router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateInterview
);

router.delete(
  "/:id",
  protect,
  authorize("recruiter"),
  deleteInterview
);

module.exports = router;