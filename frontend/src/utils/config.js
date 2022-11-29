const SERVER_IP = "localhost";
export const BASE_URL = `http://${SERVER_IP}:3001`;

export const ENDPOINT_MAPPINGS = {
	createUser: "/create-user",
	login: "/login",
	getAllProjects: "get-all-projects",
	createProject: "/create-project",
	getProjectDetails: "/get-project-details",
	createPage: "/create-page",
	getPageDetails: "/get-page-details",
	updatePage: "/update-page",
	addCollaborator: "/add-collaborator",
	viewCollaborators: "/view-collaborators",
};
