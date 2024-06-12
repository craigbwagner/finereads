const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.index);
router.get('/new', booksCtrl.new);
router.post('/', booksCtrl.create);
router.get('/:applicationId', booksCtrl.show);
router.delete('/:applicationId', booksCtrl.delete);
router.get('/:applicationId/edit', booksCtrl.edit);
router.put('/:applicationId', booksCtrl.update);

module.exports = router;
