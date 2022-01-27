const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Books Page!</h1>');
});

router.post('/', async (req, res) => {
    console.log(req.body);
});

module.exports = router;