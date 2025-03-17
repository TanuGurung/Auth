const express = require('express');
const Errors = require('./middleware/Errors');
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());

const userRoute = require('./routes/userRoutes');
app.use('/api/v1',userRoute)

app.use(Errors)

module.exports = app;
