const Pensioner = require("../models/pensioner");
const createPensioner = async (req, res) => {

    const {
        name,
        dob,
        pan,
        aadhar,
        salary_earned,
        allowances,
        classification,
        bank_detail,
    } = req.body;

    const newPensioner = new Pensioner({
        name,
        dob,
        pan,
        aadhar,
        salary_earned,
        allowances,
        classification,
        bank_detail,
    });

    await newPensioner
        .save()
        .then((r) =>
            res.status(200).json({ success: 1, data: newPensioner })
        )
        .catch((err) =>
            res
                .status(500)
                .json({ success: 0, message: "Some error occured", err: err })
        );
}

module.exports = {
    createPensioner
}