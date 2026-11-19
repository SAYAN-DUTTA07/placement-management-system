const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    role: {
        type: String,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    description: String,

    requiredSkills: [{
        type: String
    }],

    minCGPA: {
        type: Number,
        required: true
    },

    branches: [{
        type: String
    }],

    passoutYear: {
        type: Number,
        required: true
    },

    deadline: {
        type: Date
    },

    location: {
        type: String,
        default: ""
    },


}, {
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);