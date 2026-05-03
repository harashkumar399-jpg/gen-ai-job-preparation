const mongoose = require("mongoose")



const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type : String,
        required : [true, "token is required to be added in blacklist"]
    }
},{
    timestamps : true // automatically manages when token is blacklisted
}) // Define a Mongoose schema for the "blacklistTokens" collection


const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)  //converts schema into model.. as cannot directly interact with database using schema.. model is an tool to interact with database

module.exports = tokenBlacklistModel