const express = require("express");
const router = express.Router();
const Signup = require('../models/Signup');

// Get request method (read)
router.get('/', async (req, res) => {
    try {
        const signups = await Signup.find();
        res.json(signups);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get request method by id (read by id)
router.get('/:signupId', async (req, res) => {
    try {
        const signup = await Signup.findById(req.params.signupId);
        res.json(signup);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post request method (create)
router.post('/', async (req, res) => {
    const signup = new Signup({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    req.session.user = signup._id;

    try {
        const savedSignup = await signup.save();
        res.json(savedSignup);
    } catch (err) {
        res.json({ message: err });
    }
});

// Put request method (update)
router.put('/:signupId', async (req, res) => {
    try {
        const updatedSignup = await Signup.updateOne(
            { _id: req.params.signupId },
            {
                $set: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            }
        );
        res.json(updatedSignup);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete request method (delete)
router.delete("/:signupId", async (req, res) => {
    try {
        const removedSignup = await Signup.deleteOne(
            { _id: req.params.signupId }
        );
        res.json(removedSignup);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete request method (delete all)
router.delete("/", async (req, res) => {
    try {
        const removedAllSignups = await Signup.deleteMany();
        res.json(removedAllSignups);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
