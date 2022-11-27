import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

const user = "testUser";
const password = "testPass";
const frontendIP = "localhost";
const sessionSecretKey = "cmpe280_term_project";
const uri = `mongodb+srv://${user}:${password}@cluster0.xljkdkp.mongodb.net/productivityApp?retryWrites=true&w=majority`;

const app = express();
app.use(cors({ origin: `http://${frontendIP}:3000`, credentials: true }));
app.use(cookieParser());

app.use(
	session({
		secret: sessionSecretKey,
		resave: false,
		saveUninitialized: false,
		duration: 60 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
	})
);

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

try {
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		maxPoolSize: 500,
	});

	console.log("Mongoose is connected!");
	app.listen(3001, () => {
		console.log("Server listening on port 3001");
	});
} catch (err) {
	console.error("Could not connect Mongoose => ", err);
}
