const {Router} = require('express')// Import the Express library to create an Express application

const authController = require("../controllers/auth.controllers.js") //using auth controller to handle the logic of authentication related routes

const authMiddleware = require("../middlewares/auth.middleware.js")

const authRouter = Router()  // Create a new router object using the Router() method from Express to handle authentication-related routes

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/
authRouter.post("/register", authController.registerUserController) //use reisterUserController in authController to handle the logic when a POST request is made to the register 

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.userLoginController) //use loginUserController in authController to handle the logic when a POST request is made for login

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add it to blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController) //use logoutUserController in authController to handle the logic when a GET request is made for logout

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me",authMiddleware.authUser, authController.getMeController) // use getmecontroller in get me api


module.exports = authRouter // Export the authRouter so it can be used in other parts of the application to define authentication-related routes