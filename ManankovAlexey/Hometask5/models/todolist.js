const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    task: String,
    completed: Boolean
});

module.exports = mongoose.model(`todolist`, todoListSchema);