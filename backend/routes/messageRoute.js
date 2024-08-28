const express = require("express");

const messageController = require("../controllers/messageController");

const router = express.Router();

router
	.route("/")
	.post(messageController.createMessage)
	.get(messageController.getAllMessages);

// router.route("/:id").get(messageController.getAllMessagesFromUser);

module.exports = router;
