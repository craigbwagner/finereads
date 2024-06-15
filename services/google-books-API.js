const { json } = require('express');

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

async function search(query) {
	let searchURL = `https://www.googleapis.com/books/v1/volumes?maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`;
    let title = '';
	let author = '';
	let isbn = '';

	console.log(query);
	if (query.title !== undefined) {
		title = query.title;
	}
	if (query.author !== undefined) {
		author = query.author;
	}
	if (query.isbn !== undefined) {
		isbn = query.isbn;
	}
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
	}
	const response = await fetch(searchURL);
	let jsonResponse = await response.json();
	if (jsonResponse.error?.code === 400) {
		jsonResponse = undefined;
	}
	return jsonResponse;
}

async function show(bookId) {
	const bookURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	const response = await fetch(bookURL);
	const jsonResponse = await response.json();
	return jsonResponse;
}

module.exports = { search, show };
