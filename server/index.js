
require("dotenv").config();

module.exports = async (req, res) => {
    try {
        console.log("STEP 1: Loading Express application");

        const app = require("./app");

        console.log("STEP 2: Express application loaded");

        return app(req, res);
    } catch (error) {
        console.error("BACKEND STARTUP ERROR:", error);

        return res.status(500).json({
            message: "Backend startup failed",
            error: error.message
        });
    }
};