import User from "../models/user.js";

export class UserController {
	createUser = async (req, res) => {
		console.log(req.body);
		const newUserObject = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			projects: [],
		});
		try {
			const response = await newUserObject.save();
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not create new User");
		}
	};

	validateUserLogin = async (req, res) => {
		console.log(req.body);
		const email = req.body.email;
		const password = req.body.password;

		try {
			const response = await User.findOne({ email: email });
			console.log("Fetched user => ", JSON.stringify(response));

			if (response.password !== password) {
				console.log("Password mismatch");
				res.status(400).send({ validCredentials: false });
			} else {
				const userId = response.id;
				console.log(userId);
				res.cookie("userId", userId, {
					maxAge: 3600000,
					httpOnly: false,
					path: "/",
				});
				req.session.user = userId;
				res.status(200).send({
					validCredentials: true,
				});
			}
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not validate User");
		}
	};
}
