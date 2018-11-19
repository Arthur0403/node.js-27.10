const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
});

module.exports = mongoose.model('Todo', TodoSchema);

