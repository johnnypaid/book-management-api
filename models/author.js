const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        maxlength: 250,
        minlength: 4,
        required: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now()
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports.Author = Author;