const express = require("express");
const cors = require("cors");
const app = express();
const notificationRoutes = require("./routes/notificationRoutes");
const path = require("path");
const interviewRoutes = require("./routes/interviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth",
    require("./routes/authRoutes"));

app.use("/api/student",
    require("./routes/studentRoutes"));

app.use("/api/company",
    require("./routes/companyRoutes"));

app.use("/api/jobs",
    require("./routes/jobRoutes"));

app.use("/api/application",
    require("./routes/applicationRoutes"));

app.use("/api/recruiter",
    require("./routes/recruiterRoutes"));

app.use("/api/admin",
    require("./routes/adminRoutes"));

app.use("/api/notification", notificationRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/interview", interviewRoutes);
console.log("Interview routes loaded");

app.use("/api/dashboard", dashboardRoutes);
module.exports = app;

app.use((err, req, res, next) => {
    console.error("FULL ERROR:");
    console.error(err);

    res.status(500).json({
        message: err.message || err
    });
});