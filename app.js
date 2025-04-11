require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user');
productivityRouter = require('./routes/productivity');
const {prisma} = require("./utils/prismaExport");




const app = express();
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use('/productivity',productivityRouter);
app.use('/user', userRouter);
app.listen(3000)
module.exports = app;
