import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String },
	email: { type: String },
	password: { type: String },
	projects: {
		type: [
			{
				projectId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "project",
				},
			},
		],
	},
});

const User = mongoose.model("user", userSchema);

export default User;
