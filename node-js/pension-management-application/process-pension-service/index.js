require("dotenv").config();
const amqp = require("amqplib");
const express = require("express");
const isAunthicated = require("../isAunthicated");

const app = express();
const PORT = process.env.PORT || 5001;
var channel, connection;
var pension_data;

app.use(express.json());

async function connect() {
    // const amqpServer = "amqp://localhost:15672";
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PROCESS_PENSION");
}

connect();

app.post("/processpension", isAunthicated, (req, res) => {
    const { aadhar } = req.body;
    if (aadhar) {
        channel.sendToQueue("PENSIONER_DETAIL", Buffer.from(JSON.stringify({ aadhar, userEmail: req.user.email, })))
        channel.consume("PROCESS_PENSION", data => {
            pension_data = JSON.parse(data.content);
            console.log(pension_data);
            channel.ack(data);
            try {
                if (!res.headersSent)
                    // console.log("res.headersSent", );
                    return res.status(200).json(pension_data).end();
                else {
                    return res.status(400).json("test")
                }
            } catch (err) {
                return res.status(400).send(err).end();
            }
        })
    }
});

app.listen(PORT, () => {
    console.log(`process pension serive is running at port ${PORT}`);
});

