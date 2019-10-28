const express = require('express');
const BookController = require('./controller/BookController');

const router = express.Router();

router.get('/books', BookController.index);

router.post('/store-book', BookController.store);

module.exports = router;