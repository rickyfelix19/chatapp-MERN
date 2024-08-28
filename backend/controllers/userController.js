const User = require("../models/userModel");

// Register a new user
exports.createUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if the user already exists
		const userExist = await User.exists({ username });

		if (userExist) {
			return res.status(400).send({ message: "User already exists" });
		}

		// If the user doesn't exist, proceed to create a new user
		const user = new User({ username, password });
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ error: "Registration failed", details: error.message });
	}
};

// User Login
exports.loginUser = async (req, res) => {
	try {
		// const username = await JSON.parse(req.body.username);
		const userExist = await User.find(req.body);
		res.status(201).json({ message: "User login successfully" });
	} catch (error) {
		res.status(500).json({ error: "Cannot login" });
	}
};
