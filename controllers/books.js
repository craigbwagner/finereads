const User = require('../models/user');

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

// async function show(req, res) {
// 	try {
// 		const currentUser = await User.findById(req.session.user._id);
// 		const book = currentUser.books.id(req.params.bookId);
// 		res.render('books/show.ejs', { book });
// 	} catch (err) {
// 		console.log(err);
// 		res.redirect('/');
// 	}
// }

function bookSearch(req, res) {
	try {
		res.render('books/search.ejs');
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

function searchResults(req, res) {
	try {
		let searchURL = 'https://www.googleapis.com/books/v1/volumes';
		const title = req.query.title;
		const author = req.query.author;
		const isbn = req.query.isbn;
		if (title !== '' && author !== '' && isbn !== '') {
			searchURL += `?q=intitle:${title}+inauthor:${author}+isbn:${isbn}&maxResults=20`;
		} else if (title !== '' && author !== '') {
			searchURL += `?q=intitle:${title}+inauthor:${author}&maxResults=20`;
		} else if (title !== '' && isbn !== '') {
			searchURL += `?q=intitle:${title}+isbn:${isbn}&maxResults=20`;
		} else if (author !== '' && isbn !== '') {
			searchURL += `?q=inauthor:${author}+isbn:${isbn}&maxResults=20`;
		} else if (title !== '') {
			searchURL += `?q=intitle:${title}&maxResults=20`;
		} else if (author !== '') {
			searchURL += `?q=inauthor:${author}&maxResults=20`;
		} else if (isbn !== '') {
			searchURL += `?q=isbn:${isbn}&maxResults=20`;
		} else {
			return res.redirect('/books/search');
		}
		res.render('books/results.ejs', { searchQuery: req.body, searchURL });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

module.exports = {
	index,
	// show,
	bookSearch,
	searchResults,
};
