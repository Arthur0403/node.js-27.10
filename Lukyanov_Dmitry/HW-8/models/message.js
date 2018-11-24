const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    username: String,
    text: String,
    timestamp: String,
});

module.exports = mongoose.model('Message', MessageSchema);
