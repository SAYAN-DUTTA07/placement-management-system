
const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("MongoDB Connected");
                return mongoose.connection;
            })
            .catch((err) => {
                connectionPromise = null;
                console.error("MongoDB Connection Error:", err.message);
                throw err;
            });
    }

    return connectionPromise;
};

module.exports = connectDB;