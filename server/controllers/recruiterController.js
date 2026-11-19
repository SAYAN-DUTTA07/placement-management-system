const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardStats = async (req, res) => {

  try {

    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const selected =
      await Application.countDocuments({
        status: "Selected"
      });

    const rejected =
      await Application.countDocuments({
        status: "Rejected"
      });

    res.json({
      totalJobs,
      totalApplications,
      selected,
      rejected
    });

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};