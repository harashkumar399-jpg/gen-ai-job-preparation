const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 *@name registerUserController
 *@description register a new user, expects username, email and password in the request body, checks if a user with the same email or username already exists, if not creates a new user and saves it to the database, returns a success message upon successful registration
 *@access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body // extract these three fields from the request body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: " Please provide all the required fields"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username"
        })
    }
    const hash = await bcrypt.hash(password, 10) // hash the password using bcypt

    const user = await userModel.create({
        username, email, password: hash
    }) // await means wait for user to created before moving next.. create a new user in the database with the provided username, email, and hashed password

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    ) // generate a JWT for newly user created

    res.cookie("token", token) // set the generated JWT as a cookie in the response, allowing the client to store it for future authenticated requests

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }

    }) // send a JSON response with a success message and a 201 status code indicating that the user was created successfully
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function userLoginController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email }) // find a user in the database with the provided email

    if (!user) {
        return res.status(400).json({
            messsage: "Invalid email or password "
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password) // compare the provided password with the hashed password stored in the database for the user

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    ) // generate a JWT for the authenticated user

    res.cookie("token", token) //set token to cookie for future authentication

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id, username: user.username, email: user.email
        }
    }) // send a JSON response with a success message and user details upon successful login



}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add it to blacklist
 * @access Public   
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token // get the token from the request cookies

    if (token) {
        await tokenBlacklistModel.create({ token }) // add the token to the blacklist collection in the database, preventing its future use for authentication
    }

    res.clearCookie("token",token)

    res.status(200).json({
        message: "User logged out successfully"
    })

}


/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id) // find the user in the database using the ID stored in req.user (which is set by the authUser middleware after verifying the JWT)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    }) // send a JSON response with a success message and the user's details (ID, username, and email) upon successfully fetching the user information
}



module.exports = {
    registerUserController,
    userLoginController,
    logoutUserController,
    getMeController
}
