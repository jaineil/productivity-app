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
}
