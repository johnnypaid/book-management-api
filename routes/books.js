const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Book } = require('../models/books');
const { Author } = require('../models/author');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValidFile = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type.');

        if (isValidFile) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage});


router.get('/', async (req, res) => {
    const getAllBooks = await Book.find().populate('author', 'name');

    if (!getAllBooks) return res.status(500).json({success: false, message: 'Oops no books found!'});

    res.json({success: true, data: getAllBooks});
});

router.get('/:book_id', async (req, res) => {
    const getAllBooks = await Book.findById(req.params.book_id).populate('author', 'name');

    if (!getAllBooks) return res.status(500).json({success: false, message: 'Oops no books found!'});

    res.json({success: true, data: getAllBooks});
});

router.get('/author/:author_id', async (req, res) => {
    const getAuthorBooks = await Book.find({author: req.params.author_id});

    if (!getAuthorBooks) return res.status(500).json({success: false, message: 'ps no books found!'});

    res.json({success: true, data: getAuthorBooks});
});

router.post('/', uploadOptions.single('image'), async (req, res) => { 
    if(!mongoose.isValidObjectId(req.body.author_id)) {
        return res.status(400).json({success: false, message: 'Invalid author id.'});
    }

    let searchAuthor = await Author.findById(req.body.author_id);
    if (!searchAuthor) return res.send({success: true, message: 'Author is invalid.'});

    let searchTitle = await Book.findOne({title: req.body.title});
    if (searchTitle) return res.send({success: true, message: 'Title already exist.'});

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    try {
        let book = new Book({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author_id,
            image: `${basePath}${fileName}`
        });

        book = await book.save();

        if (!book) return res.status(500).json({success: false, message: 'Could not create new book.'})

        res.json({success: true, data: book});
    } catch (error) {
        return res.status(500).json({success: false , error: error.message});
    }
});

router.put('/:book_id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.book_id)) {
        return res.status(400).json({success: false, message: 'Invalid author id.'});
    }

    let searchBook = await Book.findById(req.params.book_id);
    if (!searchBook) return res.status(400).json({success: false, message: 'No book associated with such id.'});

    try {
        let updateBook = await Book.findByIdAndUpdate(
            req.params.book_id,
            {
                title: req.body.title,
                description: req.body.description
            });

        updateBook = await updateBook.save();

        if(!updateBook) return res.status(500).json({success: false, message: 'Could not update book.'});

        res.json({success: true, product: product});
    } catch (error) {
        return res.status(500).json({success: false , error: error.message});
    }
});

router.delete('/author/:author_id/:book_id', async (req, res) => {
    try {
        const deleteBook = await Book.findOneAndDelete({author: req.params.author_id, _id: req.params.book_id});

        if (!deleteBook) return res.status(400).json({success: false, message: 'No books found.'});

        res.send({success: true, message: 'Product deleted successfully.'});
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }

});

module.exports = router;