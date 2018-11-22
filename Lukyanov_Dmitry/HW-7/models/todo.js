const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
  name: String,
  completed: {type: Boolean, default: false},
});

module.exports = mongoose.model('Todo', TodoSchema);

