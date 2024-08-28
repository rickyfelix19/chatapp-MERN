const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();

app.use((req, res, next) => {
	console.log("Hello from the middleware 😄");
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/messages", messageRoute);

module.exports = app;
