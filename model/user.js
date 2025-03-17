const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:'1h'
    })
}

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass,this.password);
}

module.exports = mongoose.model("User",userSchema);