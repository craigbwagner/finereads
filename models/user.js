const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	shelvedBooks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
		},
	],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
