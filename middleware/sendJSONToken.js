const sendData = (user,statusCode,res)=>{
    const token = user.getJWTToken();

    const options = {
        maxAge: 3600000, // 1hr
        httpOnly : true
    }
    if(res.status == 200){
        cookies.set('jwt',res.data.token);
        cookies.set('email',res.data.email);
    }
    res.cookie('token',token,options);
    res.status(statusCode).json({
        success:true,
        user,
        token
    })
}

module.exports = sendData;