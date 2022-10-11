require("dotenv").config();
const express = require("express");
const router = require("./routes/pensionar");

const PORT = process.env.PORT || 5002;
const app = express();

app.use("",)

app.listen(PORT, () => {
    console.log(`pensionar details serive is running at port ${PORT}`);
})



