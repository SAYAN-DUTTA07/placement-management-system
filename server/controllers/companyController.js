const Company = require("../models/Company");

// Create Company
exports.createCompany = async (req, res) => {
  console.log("createCompany called");
  console.log(req.body);
  console.log("USER:", req.user);
  try {

    const company = await Company.create({

      companyName: req.body.companyName,
      industry: req.body.industry,
      description: req.body.description,
      packageOffered: req.body.packageOffered,
      website: req.body.website,
      createdBy: req.user.id

    });

    res.status(201).json(company);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// Get Recruiter's Company
exports.getMyCompany = async (req, res) => {

  try {

    const company = await Company.findOne({
      createdBy: req.user.id
    });

    res.json(company);

  }
  catch (err) {
    console.error("Company Creation Error:");
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }

};