const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
