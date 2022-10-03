require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib')
const app = express();

const PORT = process.env.PORT || 5001;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('auth service DB connected.');
})

async function connect() {
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT")
}


connect();


app.listen(PORT, () => {
    console.log(`product service is working at port ${PORT}`);
})
