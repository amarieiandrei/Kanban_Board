
const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
});

module.exports = mongoose.model('Card', CardSchema);