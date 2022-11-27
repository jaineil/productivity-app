import Project from "../models/project.js";

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
		try {
			const response = await newProjectObject.save();
			console.log(JSON.stringify(response));
			res.status(200).send(response);
		} catch (err) {
			console.error("Error => ", err);
			res.status(500).send("Could not create new Project");
		}
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

	// fetchPage = async (req, res) => {
	// 	console.log(req.params);
	// 	const projectId = req.params.projectId;
	// 	const pageId = req.params.pageId;

	// 	try {
	// 		const response = await Project.find(
	// 			{
	// 				$match: { "pages.id": pageId },
	// 			},
	// 			{ pages: 1 }
	// 		);
	// 		console.log(JSON.stringify(response));
	// 		res.status(200).send(response);
	// 	} catch (err) {
	// 		console.error("Error => ", err);
	// 		res.status(500).send("Could not fetch page");
	// 	}
	// };
}