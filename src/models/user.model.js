const mongoose = require("mongoose") // Import the Mongoose library for MongoDB interactions . connect express server to MongoDB database using Mongoose

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        unique: [true,"username already exists"],
        required : true,
    },

    email:{
        type : String,
        unique : [true, "account with this email already exists"],
        required : true,
    },

    password : {
        type: String,
        required : true
    }
}) // Define a Mongoose schema for the "users" collection with fields for username, email, and password, including validation rules

const userModel = mongoose.model("users", userSchema) //method in mongoose which tells user's data is storing in "users" collection in database and it will follow the structure defined in userSchema

module.exports = userModel // Export the userModel so it can be used in other parts of the application to interact with the "users" collection in the MongoDB database