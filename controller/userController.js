const ErrorHandler = require("../middleware/errorHandler");
const sendData = require("../middleware/sendJSONToken");
const User = require("../model/user");

exports.register = async(req,res,next)=>{
    try{
        const {name,email,password,confirmPassword} = req.body;
        let user = await User.findOne({"email":email});
        if(user){
            return next(new ErrorHandler('Email already exists',400))
        }
        if(password !== confirmPassword){
            return next(new ErrorHandler('password and confirm password does not match',400))
        }
        user = await User.create({
            name,
            email,
            password,
        })
        sendData(user,200,res);
    }catch(error){
        console.log(error);
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendData(user,200,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


exports.myInfo = async(req,res,next)=>{
    try{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        user
    })
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.logOut = async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires : new Date(0),
            httpOnly:true
        });

        res.status(200).json({
            success:true,
            message:"successfully logged out"
        })

    }catch(err){
        console.log(err);
        next(err);
    }
}