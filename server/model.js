const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		id: { type: String },
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserData', User)

module.exports = model