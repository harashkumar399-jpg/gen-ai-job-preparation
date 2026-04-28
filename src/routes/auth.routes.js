const {Router} = require('express')// Import the Express library to create an Express application
const authController = require("../controllers/auth.controllers") //using auth controller to handle the logic of authentication related routes
const authRouter = Router()  // Create a new router object using the Router() method from Express to handle authentication-related routes

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/
authRouter.post("/register", authController.registerUserController) //use reisterUserController in authController to handle the logic when a POST request is made to the /register endpoint of the authRouter, which is responsible for registering a new user

module.exports = authRouter // Export the authRouter so it can be used in other parts of the application to define authentication-related routes