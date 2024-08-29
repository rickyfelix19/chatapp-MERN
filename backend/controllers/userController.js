const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// https://avatar-placeholder.iran.liara.run/ //// profile picture

// Register a new user
exports.createUser = async (req, res) => {
	const { fullName, username, password, profilePic, gender } = req.body;

	try {
		// Check if the user already exists
		const userExist = await User.exists({ username });

		if (userExist) {
			return res.status(400).send({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// If the user doesn't exist, proceed to create a new user
		const user = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic,
		});

		if (user) {
			await generateToken(user._id, res);
			await user.save();
			res.status(201).json({ message: "User registered successfully" });
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
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
		const { username, password } = req.body;
		const userExist = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password " });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(201).json({ message: "User login successfully" });
	} catch (error) {
		res.status(500).json({ error: "Cannot login" });
	}
};

// User logout
exports.logoutUser = (req, res) => {
	try {
		res.cookie("jtw", "", { maxAge: 0 });
		res.status(201).json({ message: "User log out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Cannot log out" });
	}
};
