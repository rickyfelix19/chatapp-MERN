const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
		default: "",
	},
	gender: {
		type: String,
		required: true,
		enum: ["male", "female", "others"],
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
