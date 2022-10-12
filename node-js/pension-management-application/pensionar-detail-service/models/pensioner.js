const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PensionerSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    pan: {
        type: String,
        require: true,
        unique: true
    },
    aadhar: {
        type: String,
        require: true,
        unique: true
    },
    salary_earned: {
        type: Number,
        require: true
    },
    allowances: {
        type: Number,
        require: true
    },
    classification: {
        type: String,
        enum: ['self', 'family']
    },
    bank_detail: {
        bank_name: {
            type: String,
        },
        account_number: {
            type: Number,
        },
        bank_type: {
            type: String,
            enum: ['public', 'private']
        }
    },

}, {
    timestamps: true
})

module.exports = Pensioner = mongoose.model("pensioner", PensionerSchema);