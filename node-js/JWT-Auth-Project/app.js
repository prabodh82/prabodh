require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.json({
        sucess: 1,
        message: 'This rest api is working'
    })
})

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`);
})