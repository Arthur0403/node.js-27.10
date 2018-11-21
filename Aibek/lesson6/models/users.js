const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema ({
	username: String,
	password: String,
	name: String,
	age: Number
});

module.exports = mongoose.model('User', UsersSchema)