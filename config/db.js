const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise;

const initializeDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    const mongouri = process.env.MONGODB;

    if (!mongouri) {
        throw new Error("MONGODB environment variable is not set.");
    }

    connectionPromise = mongoose.connect(mongouri, {
        serverSelectionTimeoutMS: 10000,
    })
        .then(() => {
            console.log("Connected to DB");
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = null;
            console.log("Error connecting to database:", error.message);
            throw error;
        });

    return connectionPromise;
};

module.exports = { initializeDatabase };
