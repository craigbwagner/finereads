const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		googleBooksId: { type: String, required: true },
		title: { type: String, required: true },
		authors: { type: [String], required: true },
		averageRating: Number,
		imageLink: String,
		isbn10: String,
		isbn13: String,
		publisher: String,
		publishedDate: String,
		pageCount: Number,
		description: String,
		shelf: { type: String, default: 'to-read', enum: ['to-read', 'reading', 'read'] },
		userRating: Number,
		googleBooksURL: String,
	},
	{ timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
