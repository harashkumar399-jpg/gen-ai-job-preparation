const mongoose = require("mongoose");// Import the Mongoose library for MongoDB interactions . connect express server to MongoDB database using Mongoose



async function connectTODB() { // Define an asynchronous function to connect to the MongoDB database
    try {
        await mongoose.connect(process.env.MONGO_URI)// Connect to the MongoDB database using the connection string from environment variables

        console.log("Connected to MongoDB database");
    } catch (err) {
        console.log("Error connecting to MongoDB database:", err); // Log any errors that occur during the connection attempt
    }
}

module.exports = connectTODB // Export the connectTODB function so it can be used in other parts of the application