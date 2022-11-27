import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name: { type: String },
	description: { type: String },
	ownerId: {
		type: String,
	},
	collaborators: {
		type: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "user",
				},
				permissions: { type: String },
			},
		],
	},
	pages: {
		type: [
			{
				pageId: { type: mongoose.Schema.Types.ObjectId },
				title: { type: String },
				body: { type: String },
			},
		],
	},
});

const Project = mongoose.model("project", projectSchema);

export default Project;
