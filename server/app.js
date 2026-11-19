
const express = require("express");
const cors = require("cors");
const path = require("path");

const notificationRoutes = require("./routes/notificationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Placement Management API is running"
    });
});

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));

// Student
app.use("/api/student", require("./routes/studentRoutes"));

// Company
app.use("/api/company", require("./routes/companyRoutes"));

// Jobs
app.use("/api/jobs", require("./routes/jobRoutes"));

// Applications
app.use("/api/application", require("./routes/applicationRoutes"));

// Recruiter
app.use("/api/recruiter", require("./routes/recruiterRoutes"));

// Admin
app.use("/api/admin", require("./routes/adminRoutes"));

// Notifications
app.use("/api/notification", notificationRoutes);

// Interviews
app.use("/api/interview", interviewRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Uploaded files (local development only)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handler
app.use((err, req, res, next) => {
    console.error("FULL ERROR:", err);

    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === "production"
            ? "Internal server error"
            : err.message
    });
});

module.exports = app;