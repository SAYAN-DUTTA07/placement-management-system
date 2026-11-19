const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to start server:", err.message);
        process.exit(1);
    });