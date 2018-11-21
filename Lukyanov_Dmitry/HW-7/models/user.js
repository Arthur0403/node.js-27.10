const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  displayName: String,
  emails: String,
});

module.exports = mongoose.model('User', UserSchema);

