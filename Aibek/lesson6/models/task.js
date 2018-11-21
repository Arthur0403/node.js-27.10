const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
	name: String,
	content: String,
	date: Date,
	completed: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);