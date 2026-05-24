const mongoose = require("mongoose");
require("dotenv").config();

const mongouri = process.env.MONGODB;

const initializeDatabase = async () => {
    if (!mongouri) {
        console.log("MONGODB environment variable is not set.");
        return;
    }

    await mongoose.connect(mongouri)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((error) => {
            console.log("Error connecting to database:", error);
        });
};

module.exports = { initializeDatabase };
