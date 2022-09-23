const express = require('express');
const coursesRouter = require("./routes/courses");

require('dotenv').config();

const mongoose = require("mongoose");
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

app.use(coursesRouter);

mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log('connected to db successfully');
})

app.listen(process.env.PORT, () => {
    console.log('server is running at port 5000');
})