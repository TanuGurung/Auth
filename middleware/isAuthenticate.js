const User = require("../model/user");
const ErrorHandler = require("./errorHandler");
const jwt = require('jsonwebtoken')

exports.isAuthenticateUser = async(req,res,next)=>{
    try{
        let token;

        if(req?.cookies?.token) token = req?.cookies?.token ?? ''; // check if cookies exist
        let header = req?.headers?.authorization ?? ''; // check if headers method is being used
        if(header && header?.startsWith("Bearer")) token = header.split(' ')[1];

    if(!token){
        return next(new ErrorHandler("Please login",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if(!req.user){
        return next(new ErrorHandler("Invalid token",400));
    }
    next();
    }catch(err){
        next(err);
    }
}