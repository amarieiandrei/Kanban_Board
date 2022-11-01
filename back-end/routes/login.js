const express = require("express");
const User = require("../models/Signup");
const router = express.Router();
const Signup = require('../models/Signup');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findUser(email, password);

    if (user) {
        req.session.user = user._id;
        res.json({
            message: 'You are successfully login',
            auth: true,
        });
    } else {
        res.json({
            message: 'Unable to login',
            auth: false,
        });
    }
});

router.get('/hassignned', (req, res) => {
    if (req.session.user) {
        return res.json({
            auth: true,
            message: 'You are signned',
        });
    }
    return res.json({
        auth: false,
        message: 'you are not login',
    });
});

router.get('/signout', (req, res) => {
    req.session.destroy();
    res.json({
        auth: false,
    });
});

module.exports = router;