
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB before processing API requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database unavailable:", error.message);
        res.status(503).json({
            message: "Database connection unavailable"
        });
    }
});

module.exports = app;