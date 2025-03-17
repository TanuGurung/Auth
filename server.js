const app = require('./app');
const dotenv = require('dotenv');
const connectToDB = require('./config/dbConnection');
dotenv.config({path: './config/config.env'})

connectToDB();

app.listen(8080,()=>{
    console.log(`server is running on : \nhttp://localhost:8080`);
})