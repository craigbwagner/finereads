const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: { type: String, required: true },
	status: String,
	rating: Number,
	dateAdded: Date,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
