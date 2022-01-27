const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    image: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports.Book = Book;