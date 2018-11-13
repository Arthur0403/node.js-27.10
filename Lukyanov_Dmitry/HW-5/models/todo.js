const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Todo', todoSchema);

