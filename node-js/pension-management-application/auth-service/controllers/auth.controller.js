const jwt = require('jsonwebtoken');
const User = require("../models/user");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({
                sucess: 0,
                message: 'user already exists'
            })
        } else {
            const newUser = new User({
                name, email, password
            })
            await newUser.save();

            return res.json({
                sucess: 1,
                data: newUser
            })
        }
    }
    catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({
            success: 0,
            message: 'User does not exists.'
        })
    } else {
        if (password !== user.password) {
            return res.json({
                success: 0,
                message: 'Invalid password!'
            })
        }
        const payload = {
            email, name: user.name
        }
        jwt.sign(payload, 'secert', (err, token) => {
            if (err) console.log(err);
            else {
                res.json({ token })
            }
        })
    }

};

module.exports = {
    registerUser,
    login
}