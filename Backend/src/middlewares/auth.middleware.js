const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")


async function authUser(req,res,next){

    const token = req.cookies.token // read token from user cookie

    if(!token){
        return res.status(401).json({
            message:"Token not Provided."
        })
    } 

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })  //check if the token is blacklisted or not..

     if(isTokenBlacklisted){
        return res.status(401).json({
            message:"token is invalid."
        })
     }


    try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET) // to verify token or retrieve data from token

    req.user = decoded // set the decoded data to req.user so that it can be accessed in the next middlewares or route handlers

    next() 
    } catch(err) {

        return res.status(401).json({
            message:"Invalid Token."
        })
    }


}

module.exports ={ authUser }