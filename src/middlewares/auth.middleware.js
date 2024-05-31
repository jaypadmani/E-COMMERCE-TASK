const {asyncHandler} = require('../utils/asyncHandler');
const { ApiError} = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const {findUserById} = require("../models/user.model");

  
const verifyJWT = asyncHandler(async (req,_,next)=>{
    try{
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        const user = await findUserById(decodedToken.id);

        if(!user){
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    }catch(err){
        throw new ApiError(401, err?.message ||  "Invalid Access Token");
    }
})

module.exports = {verifyJWT};