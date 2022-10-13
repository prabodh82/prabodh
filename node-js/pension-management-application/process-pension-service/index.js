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
        console.log(JSON.parse(data.content));
        const { success, pensionDetail, message } = JSON.parse(data.content);
        channel.ack(data);
        if (success && pensionDetail) {
            res.json({
                success: 1,
                data: pensionDetail
            })
        } else {
            res.json({
                success: 0,
                message
            })
        }
    })
});

app.listen(PORT, () => {
    console.log(`process pension serive is running at port ${PORT}`);
});

