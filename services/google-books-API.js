const { json } = require('express');

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

async function search(query) {
	let searchURL = `https://www.googleapis.com/books/v1/volumes?maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`;

	const title = query.title;
	const author = query.author;
	const isbn = query.isbn;
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
	return jsonResponse;
}

async function show(bookId) {
	const bookURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	const response = await fetch(bookURL);
	const jsonResponse = await response.json();
	return jsonResponse;
}

module.exports = { search, show };
