import React, {useEffect, useState} from "react";
import {
	Container,
	Row,
	Col,
	Dropdown,
	Form,
	Button,
	Modal,
} from "react-bootstrap";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {makeGetRequest, makePostRequest} from "../utils/makeRequest";
import {BsFillPeopleFill} from "react-icons/bs";
import PageView from "./PageView";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";

const defaultPageBody = {
	time: new Date().getTime(),
	blocks: [
		{
			id: "Mfafaffdsg",
			type: "paragraph",
			data: {
				text: "start typing here ...",
			},
		},
	],
	version: "2.25.0",
};

const ProjectView = (props) => {
	const [projectName, setProjectName] = useState("");
	const [description, setDescription] = useState("");
	const [owner, setOwner] = useState([]);
	const [pages, setPages] = useState([]);
	const [collaborators, setCollaborators] = useState([]);
	const [activePageId, setActivePageId] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [newPageTitle, setNewPageTitle] = useState("");
	const [showCollabModal, setShowCollabModal] = useState(false);
	const [collaboratorEmail, setCollaboratorEmail] = useState("");
	const location = useLocation();
	const {projectId} = location.state;

	const handleClose = () => {
		setShowModal(false);
	};

	const handleShow = () => {
		setShowModal(true);
	};

	const handleCloseCollab = () => {
		setShowCollabModal(false);
	};

	const handleShowCollab = () => {
		setShowCollabModal(true);
	};

	const handleAddCollaborator = async () => {
		await makePostRequest(ENDPOINT_MAPPINGS.addCollaborator, {
			projectId: projectId,
			collaboratorEmail: collaboratorEmail,
			permissions: "all",
		});
		toast.success(
			`Added collaborator ${collaboratorEmail} to project ${projectName}`,
			{duration: 6000}
		);
		setShowCollabModal(false);
		getCollaborators();
	};
	const handleAddNewPage = async () => {
		await makePostRequest(ENDPOINT_MAPPINGS.createPage, {
			projectId: projectId,
			title: newPageTitle,
			body: JSON.stringify(defaultPageBody),
		});
		toast.success(
			`Added new page ${newPageTitle} to project ${projectName}`,
			{duration: 6000}
		);
		setShowModal(false);
		setProjectName(projectName + " ");
	};

	// const projectId = undefined;
	console.log("PID", projectId);

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
			console.log("TEST");
			console.log(project.pages);
			if (
				!project.pages.some(
					(page) => page._id === localStorage.getItem("activePageId")
				)
			) {
				localStorage.setItem(
					"activePageId",
					project.pages[project.pages.length - 1]._id
				);
			}
			setActivePageId(localStorage.getItem("activePageId"));
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

	const switchToPage = async (newPageId) => {
		localStorage.setItem("activePageId", newPageId);
		// setActivePageId(newPageId);
		window.location.reload();
	};

	useEffect(() => {
		getProjectDetails();
		getCollaborators();
	}, [projectName]);
	console.log("Rendering [ProjectView]");
	// console.log(activePageId);
	return (
		<Container fluid>
			<Row>
				<Col xs={2} className="pt-5" style={{height: "100%"}}>
					<div style={{height: "75vh"}}>
						<Row className="px-1 border-bottom border-2 mb-3">
							<p className="text-center display-6">
								{projectName}
							</p>
							<p className="text-center fs-6">{description}</p>
							<p className="text-center fs-6">
								<Dropdown>
									<Dropdown.Toggle
										variant="dark"
										id="dropdown-basic">
										<BsFillPeopleFill /> View Collaborators
									</Dropdown.Toggle>
									<Button
										className="mx-2"
										variant="outline-success"
										onClick={handleShowCollab}
										style={{width: "80px"}}>
										+ Add
									</Button>

									<Dropdown.Menu variant="dark">
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
						{pages?.map((page) => {
							return (
								<Row className="my-2 px-2 text-center fs-6">
									<Button
										variant="outline-dark"
										id={page._id}
										onClick={(e) => {
											switchToPage(e.target.id);
										}}>
										{page.title}
									</Button>
								</Row>
							);
						})}
					</div>
					<Row className="my-2 px-2 py-3 border-top border-dark border-1">
						{/* <p className="text-center fs-5">+ New Page</p> */}
						<Button variant="success" onClick={handleShow}>
							+ New Page
						</Button>
					</Row>
				</Col>
				<Col xs={10} className="border-start border-dark border-2">
					<PageView activePageId={activePageId} />
				</Col>
			</Row>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create new page</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>Page Title:</Form.Label>
							<Form.Control
								placeholder="Eg: Master Project"
								autoFocus
								onChange={(e) =>
									setNewPageTitle(e.target.value)
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddNewPage}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showCollabModal} onHide={handleCloseCollab}>
				<Modal.Header closeButton>
					<Modal.Title>
						Add new collaborator to your project
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>Collaborator Email:</Form.Label>
							<Form.Control
								placeholder="Eg: john.doe@sjsu.edu"
								autoFocus
								onChange={(e) =>
									setCollaboratorEmail(e.target.value)
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseCollab}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddCollaborator}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default ProjectView;
