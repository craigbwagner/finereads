const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.index);
router.get('/search', booksCtrl.bookSearch);
router.get('/results', booksCtrl.searchResults);
router.get('/show/:bookId', booksCtrl.showBook);

module.exports = router;
