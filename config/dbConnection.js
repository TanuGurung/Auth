const mongoose = require('mongoose');

const connectToDB = () =>{
    mongoose.connect(process.env.MONGODBURL).then((data)=>{
        console.log(`Database connected successfully : ${data.connection.host}`)
    }).catch((err)=>{
        console.log(`something went wrong while connecting to DB ${err}`)
    })
}

module.exports = connectToDB;