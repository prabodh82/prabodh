const User = require("../models/user");

const registerUser = (req, res) => {
    const body = req.body;
    const user = new User({

    })
};

const login = (req, res) => {
    res.json({
        message: 'login api working'
    })
};

module.exports = {
    registerUser,
    login
}