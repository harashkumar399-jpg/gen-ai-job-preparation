require("dotenv").config();// Load environment variables from a .env file into process.env

const app = require("./src/app"); // Import the Express app from src/app.js

const connectToDB = require("./src/config/database"); // Import the function to connect to the MongoDB database from src/config/database.js

connectToDB(); // Call the function to connect to the MongoDB database

app.listen(3000,() => {
    console.log("Server is running on port 3000");
}) // Start the server on port 3000 and log a message when it's running