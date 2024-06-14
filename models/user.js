const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		googleBooksId: { type: String, required: true },
		title: String,
		authors: { type: [String], required: true },
		averageRating: Number,
		imageLink: String,
		isbn10: String,
		isbn13: String,
		publisher: String,
		publishedDate: String,
		pageCount: Number,
		description: String,
		shelf: { type: String, enum: ['to-read', 'reading', 'read'] },
		userRating: Number,
		userReview: String,
		googleBooksURL: String,
	},
	{ timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } }
);

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	shelvedBooks: [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
