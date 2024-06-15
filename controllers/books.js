const User = require('../models/user');
const googleBooksAPI = require('../services/google-books-API');

async function index(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		const toReads = currentUser.shelvedBooks.filter((book) => {
			return book.shelf === 'to-read';
		});
		const currentReads = currentUser.shelvedBooks.filter((book) => {
			return book.shelf === 'reading';
		});
		const readBooks = currentUser.shelvedBooks.filter((book) => {
			return book.shelf === 'read';
		});
		res.render('books/index.ejs', {
			currentUser,
			toReads,
			currentReads,
			readBooks,
		});
	} catch (err) {
		console.log(err);
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
		if (searchResults === undefined) {
			res.redirect('/books/search');
		} else {
			res.render('books/results.ejs', { searchResults });
		}
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function showBook(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		const selectedBookId = req.params.bookId;
		const selectedBook = await googleBooksAPI.show(selectedBookId);
		let isShelved = false;
		let shelfStatus = 'to-read';

		currentUser.shelvedBooks.forEach((book) => {
			if (selectedBookId === book.googleBooksId) {
				isShelved = true;
			}
		});
		if (isShelved) {
			const shelvedBook = currentUser.shelvedBooks.filter((book) => {
				return book.googleBooksId === selectedBookId;
			});
			shelfStatus = shelvedBook[0].shelf;
		}

		res.render('books/show.ejs', { book: selectedBook, currentUser, isShelved, shelfStatus });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function addToShelf(req, res) {
	try {
		const currentUser = await User.findById(req.params.userId);
		const selectedBookId = req.params.bookId;
		const selectedBook = await googleBooksAPI.show(selectedBookId);
        let isShelved = false;

		currentUser.shelvedBooks.forEach((book) => {
			if (selectedBookId === book.googleBooksId) {
				isShelved = true;
			}
		});

		if (!isShelved) {
			let bookDataPackage = {};

			bookDataPackage.googleBooksId = selectedBookId;
			bookDataPackage.title = selectedBook.volumeInfo.title;
			bookDataPackage.authors = selectedBook.volumeInfo.authors;
			bookDataPackage.averageRating = selectedBook.volumeInfo.averageRating;
			if (selectedBook.volumeInfo.imageLinks?.thumbnail) {
				bookDataPackage.imageLink = selectedBook.volumeInfo.imageLinks.thumbnail;
			}
			bookDataPackage.isbn10 = selectedBook.volumeInfo.industryIdentifiers[0].identifier;
			bookDataPackage.isbn13 = selectedBook.volumeInfo.industryIdentifiers[1].identifier;
			bookDataPackage.publisher = selectedBook.volumeInfo.publisher;
			bookDataPackage.publishedDate = selectedBook.volumeInfo.publishedDate;
			bookDataPackage.pageCount = selectedBook.volumeInfo.pageCount;
			bookDataPackage.description = selectedBook.volumeInfo.description;
			bookDataPackage.shelf = req.body.shelf;
			bookDataPackage.googleBooksUrl = selectedBook.volumeInfo.canonicalVolumeLink;

			currentUser.shelvedBooks.push(bookDataPackage);
		} else {
			currentUser.shelvedBooks.forEach((book) => {
				if (book.googleBooksId === selectedBookId) {
					book.shelf = req.body.shelf;
				}
			});
		}
		await currentUser.save();
		res.redirect('/books/users/<%= req.params.userId %>');
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function removeBook(req, res) {
	try {
		const currentUser = await User.findById(req.params.userId);
		currentUser.shelvedBooks = currentUser.shelvedBooks.filter((book) => {
			return book.googleBooksId !== req.params.bookId;
		});
		await currentUser.save();
		res.redirect(`/books/show/${req.params.bookId}`);
	} catch (err) {
		console.log(err);
		res.redirect(`/books/show/${req.params.bookId}`);
	}
}

module.exports = {
	index,
	showBook,
	bookSearch,
	searchResults,
	addToShelf,
	removeBook,
};
