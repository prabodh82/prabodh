const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    empId: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    qualification: {
        type: String,
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model("employee", EmployeeSchema, "employee"   );