const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const http = require("http"); // Import http to create the server
const { Server } = require("socket.io"); // Import Socket.io

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB Connection is successful!");
	})
	.catch((error) => {
		console.log(error);
	});

// Create an HTTP server with Express
const server = http.createServer(app);

// Initialize Socket.io on the server
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000", // Replace with your frontend URL
		methods: ["GET", "POST"],
	},
});

// Listen for connection events
io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	// Listen for a 'sendMessage' event from the client
	socket.on("sendMessage", (messageData) => {
		// Broadcast the message to all connected clients
		io.emit("broadcastMessage", messageData);
	});

	// Handle disconnect
	socket.on("disconnect", () => {
		console.log("A user disconnected:", socket.id);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
