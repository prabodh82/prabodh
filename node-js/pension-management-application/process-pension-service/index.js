require("dotenv").config();
const amqp = require("amqplib");
const express = require("express");
const isAunthicated = require("../isAunthicated");

const app = express();
const PORT = process.env.PORT || 5001;
var channel, connection;

app.use(express.json());

async function connect() {
    // const amqpServer = "amqp://localhost:15672";
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PROCESS_PENSION");
}

connect();

app.post("/processpension", isAunthicated, async (req, res) => {
    const { aadhar } = req.body;
    channel.sendToQueue("PENSIONER_DETAIL", Buffer.from(JSON.stringify({ aadhar, userEmail: req.user.email, })))
    await channel.consume("PROCESS_PENSION", data => {
        const { success, pensionar, message } = JSON.parse(data.content);
        if (success && pensionar) {
            console.log('pensionar', pensionar);
        } else {
            console.log(message);
        }
        channel.ack(data);
    })
});

app.listen(PORT, () => {
    console.log(`process pension serive is running at port ${PORT}`);
});

