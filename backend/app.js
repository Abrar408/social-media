require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(logger) ;//log requests to console and logfile

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/auth', require('./routes/auth'));
app.use('/following', require('./routes/following'));
app.use('/userList', require('./routes/list'));

app.use(errorHandler); //log errors to errorLog file

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{ console.log(`Express server listening on port ${PORT}`) });
})