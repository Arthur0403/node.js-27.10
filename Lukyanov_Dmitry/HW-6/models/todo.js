const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  name: String,
  edit: Boolean,
});

module.exports = mongoose.model('todo', todoSchema);

