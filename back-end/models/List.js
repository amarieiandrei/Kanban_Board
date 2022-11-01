
const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }]
});

module.exports = mongoose.model('List', ListSchema);