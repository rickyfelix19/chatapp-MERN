const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
