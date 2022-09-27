require('dotenv').config();
const express = require('express');
const userRouter = require("./api/users/user.router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRouter);

// app.get('/api', (req, res) => {
//     res.json({
//         sucess: 1,
//         message: 'This rest api is working'
//     })
// })

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`);
})