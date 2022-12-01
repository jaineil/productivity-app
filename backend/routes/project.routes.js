import express from "express";
import { ProjectController } from "../controllers/project.controller.js";

const projectRoutes = express.Router();
const projectController = new ProjectController();

projectRoutes.post("/create-project", projectController.createProject);
projectRoutes.get(
	"/get-project-details/:projectId",
	projectController.fetchProjectDetails
);
projectRoutes.post("/create-page", projectController.createPage);
projectRoutes.get("/get-page-details/:pageId", projectController.fetchPage);
projectRoutes.post("/update-page", projectController.updatePage);
projectRoutes.post("/add-collaborator", projectController.addCollaborator);
projectRoutes.get(
	"/view-collaborators/:projectId",
	projectController.fetchCollaboratorsForProject
);
projectRoutes.get(
	"/search-projects/:ownerId/:searchQuery",
	projectController.search
);

export default projectRoutes;
