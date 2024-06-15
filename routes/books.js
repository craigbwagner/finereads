const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/users/:userId', booksCtrl.index);
router.get('/search', booksCtrl.bookSearch);
router.get('/results', booksCtrl.searchResults);
router.get('/show/:bookId', booksCtrl.showBook);
router.post('/:bookId/users/:userId', booksCtrl.addToShelf);
router.post('/:bookId/reviews', booksCtrl.addReview);
router.delete('/:bookId/users/:userId', booksCtrl.removeBook);

module.exports = router;
