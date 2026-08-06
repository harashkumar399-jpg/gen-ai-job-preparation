const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const { sendWelcomeEmail } = require("../services/email.service")

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            })
        }

        const cleanEmail = email.trim().toLowerCase()
        const cleanUsername = username.trim()

        const isUsernameTaken = await userModel.findOne({
            username: new RegExp(`^${cleanUsername}$`, "i")
        })

        if (isUsernameTaken) {
            return res.status(400).json({
                message: `Username "${cleanUsername}" is already taken. Please choose a different username.`
            })
        }

        const isEmailTaken = await userModel.findOne({ email: cleanEmail })

        if (isEmailTaken) {
            return res.status(400).json({
                message: `An account with email "${cleanEmail}" already exists. Please login instead.`
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username: cleanUsername,
            email: cleanEmail,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, cookieOptions)

        // Send welcome email asynchronously
        sendWelcomeEmail(user.email, user.username).catch((err) => {
            console.error("Failed to send welcome email:", err)
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("Register Error:", err)
        if (err.code === 11000) {
            const field = err.keyPattern?.username ? "Username" : "Email"
            return res.status(400).json({
                message: `${field} is already registered. Please choose another.`
            })
        }
        return res.status(500).json({
            message: err.message || "Internal server error during registration"
        })
    }
}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        const cleanEmail = email.trim().toLowerCase()
        const user = await userModel.findOne({ email: cleanEmail })

        if (!user) {
            return res.status(400).json({
                message: "No account found with this email. Please register first."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password. Please check your password and try again."
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            message: "User loggedIn successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("Login Error:", err)
        return res.status(500).json({
            message: err.message || "Internal server error during login"
        })
    }
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token

        if (token) {
            await tokenBlacklistModel.create({ token })
        }

        res.clearCookie("token", cookieOptions)

        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (err) {
        console.error("Logout Error:", err)
        return res.status(500).json({
            message: err.message || "Internal server error during logout"
        })
    }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(440).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("GetMe Error:", err)
        return res.status(500).json({
            message: err.message || "Internal server error"
        })
    }
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}