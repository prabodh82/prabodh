const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        sucess: 1,
        message: 'This rest api is working'
    })
})

app.listen(3000, () => {
    console.log('server is up and running');
})