const mongoose = require('mongoose');
const { Schema } = mongoose;

const Entry = new Schema({
	title: String,
	description: String,
	content: String
});

module.exports = mongoose.model('Entry', Entry);