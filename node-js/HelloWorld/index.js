const express = require("express");

const app = express();

app.get("/", (req, res) =>
    res.send("Hello world this app is running on a conatainer")
);

app.listen(3000, () => {
    console.log(`this app is listening at port 3000`);
})