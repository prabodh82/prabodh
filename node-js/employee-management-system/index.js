require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const employeeRoute = require("./routes/employee");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/employee", employeeRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`)
    })
})

