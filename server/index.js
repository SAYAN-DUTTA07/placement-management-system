require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error("Database unavailable:", error.message);

        return res.status(503).json({
            message: "Database connection unavailable"
        });
    }
};