const mongoose = require('mongoose')

const BoardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Boards', BoardSchema)