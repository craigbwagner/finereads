const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.index);
router.get('/search', booksCtrl.bookSearch);
router.get('/:bookId', booksCtrl.show);

module.exports = router;
