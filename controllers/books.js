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

async function show(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		const book = currentUser.books.id(req.params.bookId);
		res.render('books/show.ejs', { book });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

function bookSearch(req, res) {
	try {
		console.log('search');
		res.render('books/search.ejs');
	} catch (err) {
		console.log(hello);
		res.redirect('/');
	}
}

module.exports = {
	index,
	show,
	bookSearch,
};
