const express = require('express');
const mongoose = require("mongoose");
const Jwt = require('jsonwebtoken');
const User = require('./user');

const app = express();

const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/auth-service', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('auth service DB connected.');
})

app.use(express.json());

// register

app.post('/auth/reg', async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({
            success: 0,
            message: 'User already exists.'
        })
    } else {
        const newUser = new User({
            name, email, password
        })
        await newUser.save();
        return res.json(newUser);
    }
})

// login

app.post('/auth/login', async (req, res) => {
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
        Jwt.sign(payload, 'secert', (err, token) => {
            if (err) console.log(err);
            else {
                res.json({ token })
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Auth service is at port ${PORT}`);
})