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
// projectRoutes.get(
// 	"/get-page-details/:projectId/:pageId",
// 	projectController.fetchPage
// );

export default projectRoutes;
