require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const app = express();



app.use(express.json());

app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("auth service db connected")
})


app.listen(PORT, () => {
    console.log(`auth service is running at port ${PORT}`)
});


