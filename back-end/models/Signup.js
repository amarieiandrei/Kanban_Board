
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SignupSchema = mongoose.Schema({
    name: {
        type: String
        // required: true
    },
    username: {
        type: String
        // required: true
    },
    email: {
        type: String
        // required: true
    },
    password: {
        type: String
        // required: true
    }
});

SignupSchema.statics.findUser = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return;
    }
    return user;
};

SignupSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('Signups', SignupSchema);
module.exports = User;