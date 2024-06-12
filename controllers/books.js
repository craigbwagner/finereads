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
		const application = currentUser.applications.id(req.params.applicationId);
		res.render('applications/show.ejs', { application });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function deleteApp(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		currentUser.applications.id(req.params.applicationId).deleteOne();
		await currentUser.save();
		res.redirect(`/users/${currentUser._id}/applications`);
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function update(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		const application = currentUser.applications.id(req.params.applicationId);
		application.set(req.body);
		await currentUser.save();
		res.redirect(`/users/${currentUser_id}/applications/${req.params.applicationId}`);
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

async function edit(req, res) {
	try {
		const currentUser = await User.findById(req.session.user._id);
		const application = currentUser.applications.id(req.params.applicationId);
		res.render('applications/edit.ejs', { application });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

function newAppForm(req, res) {
	res.render('applications/new.ejs');
}

async function create(req, res) {
	try {
		console.log(req.session.user);
		const foundUser = await User.findById(req.session.user._id);
		foundUser.applications.push(req.body);
		await foundUser.save();
		res.redirect(`/users/${foundUser._id}/applications`);
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
}

module.exports = {
	index,
	new: newAppForm,
	create,
	show,
	delete: deleteApp,
	edit,
	update,
};
