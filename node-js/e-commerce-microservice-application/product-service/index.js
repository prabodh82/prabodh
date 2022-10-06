require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const amqp = require('amqplib')
const Product = require("./product");
const isAunthicated = require("../isAunthicated");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('product service DB connected.');
})

async function connect() {
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT")
}

connect();

// create a new product
app.post("/product/create", isAunthicated, async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct= new Product({
        name, 
        description,
        price
    })
    return res.json(newProduct);
})

// buy a new product

app.post("/product/buy", isAunthicated, async(req, res) => {
    const [ids] = req.body;
    const products = await Product.find(_id,{ $in : ids});
})

app.listen(PORT, () => {
    console.log(`product service is working at port ${PORT}`);
})
