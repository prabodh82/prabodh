require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const pensionerRouter = require("./routes/pensioner");
const amqp = require("amqplib");
const Pensioner = require("./models/pensioner");

const PORT = process.env.PORT || 5002;
const app = express();

let connection, channel;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("pensionar service db connected")
});

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PENSIONER_DETAIL");
}

connect().then(async () => {
    channel.consume("PENSIONER_DETAIL", data => {
        const { aadhar, userEmail } = JSON.parse(data.content);
        Pensioner.findOne({ aadhar }).then(res => {
            const pensionar = res;
            channel.sendToQueue("PROCESS_PENSION", Buffer.from(JSON.stringify({ success: 1, pensionar })));
        }).catch(err => {
            channel.sendToQueue("PROCESS_PENSION", Buffer.from(JSON.stringify({ success: 0, message: 'aadhar is not avaiable' })));
        })
        channel.ack(data);
    })
});

app.use(express.json());
app.use("/api/pensioner", pensionerRouter);

app.listen(PORT, () => {
    console.log(`pensionar details serive is running at port ${PORT}`);
})



