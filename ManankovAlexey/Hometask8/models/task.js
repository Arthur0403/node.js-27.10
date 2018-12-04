const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: String,
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('task', taskSchema);