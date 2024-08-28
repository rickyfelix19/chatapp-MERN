const Message = require("../models/messageModel");

// Send a new message
exports.createMessage = async (req, res) => {
	const { username, content } = req.body;

	try {
		const message = new Message({ username, content });
		await message.save();
		res
			.status(201)
			.json({ message: "Message sent succesfully", data: message });
	} catch (err) {
		res.status(500).json({ message: "Failed to send message" });
	}
};

// Get all messages

exports.getAllMessages = async (req, res) => {
	try {
		const message = await Message.find().sort({ timestamp: 1 });
		res.status(200).json(message);
	} catch (err) {
		res.status(500).json({ message: "Failed to retrieve all messages" });
	}
};

// // Get all messages from a specific user
// exports.getAllMessagesFromUser = async (req, res) => {
// 	const { username } = req.params;

// 	try {
// 		// Find messages where the username matches
// 		const messages = await Message.find({ username }).sort({ timestamp: 1 }); // Sort messages by timestamp
// 		res.status(200).json(messages);
// 	} catch (err) {
// 		console.error("Error while retrieving messages:", err);
// 		res
// 			.status(500)
// 			.json({ message: "Failed to retrieve messages", error: err.message });
// 	}
// };
