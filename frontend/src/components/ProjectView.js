import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {makeGetRequest} from "../utils/makeRequest";
import Editor from "./Editor";
import {BsFillPeopleFill} from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

const ProjectView = ({projectId}) => {
	const [projectName, setProjectName] = useState("");
	const [description, setDescription] = useState("");
	const [owner, setOwner] = useState([]);
	const [pages, setPages] = useState([]);
	const [collaborators, setCollaborators] = useState([]);

	const getProjectDetails = async () => {
		const project = await makeGetRequest(
			ENDPOINT_MAPPINGS.getProjectDetails,
			[projectId]
		);
		if (project) {
			setProjectName(project.name);
			setDescription(project.description);
			setOwner([project["ownerId"]["email"]]);
			setPages(project.pages);
		}
	};

	const getCollaborators = async () => {
		const project = await makeGetRequest(
			ENDPOINT_MAPPINGS.viewCollaborators,
			[projectId]
		);
		if (project) {
			setCollaborators(
				project.collaborators.map(
					(collaboratorObj) => collaboratorObj["userId"]["email"]
				)
			);
		}
	};
	useEffect(() => {
		getProjectDetails();
		getCollaborators();
	}, []);
	console.log("COLL");
	return (
		<Container fluid>
			<Row>
				<Col
					xs={2}
					className="border-end border-dark border-2 pt-5"
					style={{height: "100%"}}>
					<div style={{height: "85vh"}}>
						<Row className="px-1 border-bottom border-2 mb-3">
							<p className="text-center display-6">
								{projectName}
							</p>
							<p className="text-center fs-6">{description}</p>
							<p className="text-center fs-6">
								<Dropdown>
									<Dropdown.Toggle
										variant=""
										id="dropdown-basic">
										<BsFillPeopleFill /> View Collaborators
									</Dropdown.Toggle>

									<Dropdown.Menu>
										{[...owner, ...collaborators]?.map(
											(collaborator) => {
												return (
													<Dropdown.Item>
														{collaborator}
													</Dropdown.Item>
												);
											}
										)}
									</Dropdown.Menu>
								</Dropdown>
							</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Master Project</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">System Design</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Leetcode</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Web UI Design</p>
						</Row>
					</div>
					<Row className="my-2 px-2 py-3 border-top border-dark border-1">
						<p className="text-center fs-5">+ New Page</p>
					</Row>
				</Col>
				<Col xs={10}>
					<Row className="mx-3 my-2 pt-3">
						<p className="display-4">Master Project</p>
					</Row>
					<Editor />
				</Col>
			</Row>
		</Container>
	);
};

export default ProjectView;
