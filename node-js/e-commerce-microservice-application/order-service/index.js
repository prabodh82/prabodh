require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const amqp = require('amqplib')
const Order = require("./order");
const isAunthicated = require("../isAunthicated");

const PORT = process.env.PORT || 5002;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/order-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('order service DB connected.');
})

async function connect() {
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER")
}

connect();



app.listen(PORT, () => {
    console.log(`order service is at port ${PORT}`);
})