import mongoose from "mongoose";
import Project from "../models/project.js";
import User from "../models/user.js";

export class ProjectController {
	createProject = async (req, res) => {
		console.log(req.body);
		const newProjectObject = new Project({
			name: req.body.name,
			description: req.body.description,
			ownerId: req.body.ownerId,
			collaborators: [],
			pages: [],
		});

		const session = await mongoose.connection.startSession();

		try {
			session.startTransaction();

			const createProjectResponse = await newProjectObject.save({
				session,
			});
			console.log(JSON.stringify(createProjectResponse));

			const addProjectToOwnerResponse = await User.findByIdAndUpdate(
				newProjectObject.ownerId,
				{
					$push: {
						projects: { projectId: createProjectResponse.id },
					},
				},
				{ session }
			);
			console.log(JSON.stringify(addProjectToOwnerResponse));

			await session.commitTransaction();
			console.log("Successful transaction");

			res.status(200).send(createProjectResponse);
		} catch (err) {
			console.log("Error in transaction, rolling back");
			await session.abortTransaction();
			console.error("Error => ", err);
			res.status(500).send("Could not create new Project");
		}

		session.endSession();
	};

	fetchProjectDetails = async (req, res) => {
		console.log(req.params);
		const projectId = req.params.projectId;
		try {
			const response = await Project.findById(projectId).populate(
				"ownerId"
			);
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not fetch project");
		}
	};

	createPage = async (req, res) => {
		console.log(req.body);
		const projectId = req.body.projectId;
		const newPageObject = {
			title: req.body.title,
			body: req.body.body,
		};

		try {
			const response = await Project.updateOne(
				{ _id: projectId },
				{ $push: { pages: newPageObject } }
			);
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not create page in project");
		}
	};

	fetchPage = async (req, res) => {
		console.log(req.params);
		const pageId = req.params.pageId;

		try {
			const response = await Project.aggregate([
				{ $unwind: "$pages" },
				{ $match: { "pages._id": mongoose.Types.ObjectId(pageId) } },
				{
					$project: {
						pages: 1,
					},
				},
			]);
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not fetch page");
		}
	};

	updatePage = async (req, res) => {
		console.log(req.body);
		const pageId = req.body.pageId;
		const updatedPageObject = {
			title: req.body.title,
			body: req.body.body,
		};

		try {
			const response = await Project.findOneAndUpdate(
				{ "pages._id": mongoose.Types.ObjectId(pageId) },
				{
					$set: {
						"pages.$[page].title": updatedPageObject.title,
						"pages.$[page].body": updatedPageObject.body,
					},
				},
				{
					arrayFilters: [
						{ "page._id": mongoose.Types.ObjectId(pageId) },
					],
					new: true,
				}
			);
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not update page");
		}
	};

	addCollaborator = async (req, res) => {
		console.log(req.body);
		const projectId = req.body.projectId;

		const collaboratorEmail = req.body.collaboratorEmail;
		const permissions = req.body.permissions;

		const session = await mongoose.connection.startSession();

		try {
			session.startTransaction();

			const projectAddedToCollaboratorResponse = await User.updateOne(
				{ email: collaboratorEmail },
				{ $push: { projects: { projectId: projectId } } },
				{ session }
			);
			console.log(JSON.stringify(projectAddedToCollaboratorResponse));

			const collaborator = await User.findOne({
				email: collaboratorEmail,
			});
			const collaboratorId = collaborator.id;

			const collaboratorAddedToProjectResponse = await Project.updateOne(
				{ _id: projectId },
				{
					$push: {
						collaborators: {
							userId: collaboratorId,
							permissions: permissions,
						},
					},
				},
				{ session }
			);
			console.log(JSON.stringify(collaboratorAddedToProjectResponse));

			await session.commitTransaction();
			console.log("Successful transaction");

			res.status(200).send("OK");
		} catch (err) {
			console.log("Error in transaction, rolling back");
			await session.abortTransaction();
			console.error("Error => ", err);
			res.status(500).send("Could not add collaborator correctly");
		}

		session.endSession();
	};
}
