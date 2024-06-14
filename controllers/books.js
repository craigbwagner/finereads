const User = require('../models/user');
const googleBooksAPI = require('../services/google-books-API');

async function index(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
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
		const currentUser = await User.findById(req.session.user._id);
		const selectedBookId = req.params.bookId;
		const jsonResponse = await googleBooksAPI.show(selectedBookId);
		res.render('books/show.ejs', { book: jsonResponse, currentUser });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function addToShelf(req, res) {
	try {
		const currentUser = await User.findById(req.params.userId);
		const selectedBookId = req.params.bookId;
		let bookDataPackage = {};

		bookDataPackage.googleBooksId = selectedBookId;
		bookDataPackage.shelf = req.body.shelf;

		currentUser.shelvedBooks.push(bookDataPackage);
		await currentUser.save();
		res.redirect('/books/users/<%= req.params.userId %>');
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
	addToShelf,
};
