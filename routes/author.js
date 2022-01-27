const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Author} = require('../models/author')
const {Book} = require('../models/books')


router.post('/register', async(req, res) => {
    const searchAuthor = await Author.findOne({name: req.body.name});
    if (searchAuthor) return res.status(400).json({success: false, error: 'Author name already exist.'});

    const searchEmail = await Author.findOne({email: req.body.email});
    if (searchEmail) return res.status(400).json({success: false, error: 'Email name already exist.'});

    try {
        let author = new Author({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        author = await author.save();

        if (!author) return res.status(500).json({success: false, error: 'Could not create author.'});

        res.json({success: true, message: 'Author successfully created.'});
    } catch (error) {
        return res.status(500).json({success: false, error: error.message});
    }
});

router.post('/login', async(req, res) => {
    const author = await Author.findOne({email: req.body.email});
    const secret = process.env.SECRET;

    if(!author) return res.status(400).json({success: false, error: 'Invalid author.'});

    if (author && bcrypt.compareSync(req.body.password, author.password)) {
        const token = jwt.sign({
            authorId: author._id,
            authorName: author.name,
            authorEmail: author.email
            },
            secret,
            {expiresIn: '1d'}
        );
        
        res.send({
                success: true, id: author._id, 
                author: author.name, 
                email: author.email, 
                token: token
            });
    } else {
        return res.status(400).json({success: false, message: 'Invalid author.'});
    }
});

module.exports = router;