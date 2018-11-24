const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: String,
    completed: Boolean
});

module.exports = mongoose.model('task', taskSchema);