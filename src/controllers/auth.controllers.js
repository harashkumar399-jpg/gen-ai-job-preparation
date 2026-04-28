const userModel = require("../models/user.model") 


/**
 *@name registerUserController
 *@description register a new user, expects username, email and password in the request body, checks if a user with the same email or username already exists, if not creates a new user and saves it to the database, returns a success message upon successful registration
 *@access Public
 
 */
async function registerUserController(req,res){
    const {username,email,password} = req.body // extract these three fields from the request body

    if(!username || !email || !password){return res.status(400).json({
        message : " Please provide all the required fields"
    })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or :[{username},{email}]
    }) 

    if(isUserAlreadyExists){ 
        return res.status(400).json({
            message:"Account already exists with this email or username"
        })
    }
}

module.exports = {
    registerUserController
}