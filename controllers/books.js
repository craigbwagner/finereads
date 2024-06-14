const User = require('../models/user');
const googleBooksAPI = require('../services/google-books-API');

async function index(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		console.log(currentUser);
		res.render('books/index.ejs', {
			name: currentUser.username,
		});
	} catch (err) {
		res.redirect('/');
	}
}

function bookSearch(req, res) {
	try {
		res.render('books/search.ejs');
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function searchResults(req, res) {
	try {
		const searchResults = await googleBooksAPI.search(req.query);
		res.render('books/results.ejs', { searchResults });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function showBook(req, res) {
	try {
		const selectedBookId = req.params.bookId;
		const bookURL = `https://www.googleapis.com/books/v1/volumes/${selectedBookId}`;
		const response = await fetch(bookURL);
		const jsonResponse = await response.json();
		res.render('books/show.ejs', { book: jsonResponse });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

module.exports = {
	index,
	showBook,
	bookSearch,
	searchResults,
};
