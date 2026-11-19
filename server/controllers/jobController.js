const Job = require("../models/Job");

exports.createJob = async (req, res) => {

  try {

    const job = await Job.create(req.body);

    res.status(201).json(job);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


exports.getJobs = async (req, res) => {

  try {

    const {
      search = "",
      branch = "",
      company = "",
      cgpa = "",
      page = 1,
      sort = "latest"
    } = req.query;

    const limit = 5;
    const skip = (Number(page) - 1) * limit;

    let query = {};

    // Search by Role or Skill

    if (search) {

      query.$or = [

        {
          role: {
            $regex: search,
            $options: "i"
          }
        },

        {
          requiredSkills: {
            $regex: search,
            $options: "i"
          }
        }

      ];

    }

    // Branch Filter

    if (branch) {

      query.branches = {
        $in: [branch]
      };

    }

    // CGPA Filter

    if (cgpa) {

      query.minCGPA = {
        $lte: Number(cgpa)
      };

    }

    let jobs = await Job.find(query)
      .populate("company");

    // Company Filter

    if (company) {

      jobs = jobs.filter(job =>
        job.company?.companyName
          ?.toLowerCase()
          .includes(company.toLowerCase())
      );

    }

    // Sorting

    if (sort === "salary") {

      jobs.sort(
        (a, b) =>
          (b.company?.packageOffered || 0) -
          (a.company?.packageOffered || 0)
      );

    }
    else {

      jobs.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

    }

    const totalJobs = jobs.length;

    const paginatedJobs = jobs.slice(
      skip,
      skip + limit
    );

    res.json({

      jobs: paginatedJobs,

      currentPage: Number(page),

      totalPages: Math.ceil(totalJobs / limit),

      totalJobs

    });

  }
  catch (err) {

    console.log(err);

    res.status(500).json({

      message: err.message

    });

  }

};



// Get Recruiter's Jobs
exports.getMyJobs = async (req, res) => {

  try {

    const jobs = await Job.find()
      .populate("company");

    const myJobs = jobs.filter(
      job => job.company?.createdBy.toString() === req.user.id
    );

    res.json(myJobs);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// Delete Job
exports.deleteJob = async (req, res) => {

  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job Deleted Successfully"
    });

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// Update Job
exports.updateJob = async (req, res) => {

  try {

    const job = await Job.findByIdAndUpdate(

      req.params.id,
      req.body,
      { new: true }

    );

    res.json(job);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// Get One Job
exports.getJobById = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    res.json(job);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};