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

const getBankCharges = (bank_type) => {
    return bank_type === "public" ? 500 : 550;
}

const getPercentage = (classification) => {
    return classification === 'self' ? 80 : 50
}

connect().then(async () => {
    await channel.consume("PENSIONER_DETAIL", data => {
        const { aadhar, userEmail } = JSON.parse(data.content);
        channel.ack(data);
        Pensioner.findOne({ aadhar }).then(res => {
            const pensionar = res;
            if (pensionar) {
                const { bank_detail, classification, salary_earned, allowances } = pensionar;
                const { bank_type } = bank_detail;
                const bank_charges = getBankCharges(bank_type);
                const percentage = getPercentage(classification);
                const pension_amount = (percentage * salary_earned) / 100 + allowances;
                const pensionDetail = {
                    pensionAmount: pension_amount,
                    bankServiceCharges: bank_charges
                }
                channel.sendToQueue("PROCESS_PENSION", Buffer.from(JSON.stringify({ success: 1, pensionDetail })));
            } else {
                channel.sendToQueue("PROCESS_PENSION", Buffer.from(JSON.stringify({ success: 0, message: "Invalid pensioner detail provided, please provide valid detail." })));
            }
        }).catch(err => {
            //channel.sendToQueue("PROCESS_PENSION", Buffer.from(JSON.stringify({ success: 0, message: "Invalid pensioner detail provided, please provide valid detail." })));
        })

    })
});


app.use(express.json());
app.use("/api/pensioner", pensionerRouter);

app.listen(PORT, () => {
    console.log(`pensionar details serive is running at port ${PORT}`);
})



