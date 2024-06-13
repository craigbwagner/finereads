const { json } = require('express');
const User = require('../models/user');

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

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

async function searchResults(req, res) {
	try {
		let searchURL = `https://www.googleapis.com/books/v1/volumes?maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`;
		const title = req.query.title;
		const author = req.query.author;
		const isbn = req.query.isbn;
		if (title !== '' && author !== '' && isbn !== '') {
			searchURL += `&q=intitle:${title}+inauthor:${author}+isbn:${isbn}`;
		} else if (title !== '' && author !== '') {
			searchURL += `&q=intitle:${title}+inauthor:${author}`;
		} else if (title !== '' && isbn !== '') {
			searchURL += `&q=intitle:${title}+isbn:${isbn}`;
		} else if (author !== '' && isbn !== '') {
			searchURL += `&q=inauthor:${author}+isbn:${isbn}`;
		} else if (title !== '') {
			searchURL += `&q=intitle:${title}`;
		} else if (author !== '') {
			searchURL += `&q=inauthor:${author}`;
		} else if (isbn !== '') {
			searchURL += `&q=isbn:${isbn}`;
		} else {
			return res.redirect('/books/search');
		}
		const response = await fetch(searchURL);
		const jsonResponse = await response.json();
		res.render('books/results.ejs', { searchQuery: req.query, searchResults: jsonResponse });
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
