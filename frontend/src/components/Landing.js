import React, {useEffect, useState} from "react";
import {loadCSS} from "fg-loadcss";
import ProjectsGrid from "./ProjectsGrid";
import Icon from "@mui/material/Icon";
import {Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CreateProjectModal from "./CreateProjectModal";
import {makeGetRequest, makePostRequest} from "../utils/makeRequest";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {useCookies} from "react-cookie";

const Landing = () => {
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [projects, setProjects] = useState([]);
	const [cookies, setCookie] = useCookies(["userId"]);
	const handleTitleChange = (e) => {
		console.log(e.target.value);
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		console.log(e.target.value);
		setDescription(e.target.value);
	};

	useEffect(() => {
		const node = loadCSS(
			"https://use.fontawesome.com/releases/v5.14.0/css/all.css",
			// Inject before JSS
			document.querySelector("#font-awesome-css") ||
				document.head.firstChild
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

	const getProjects = async () => {
		const res = await makeGetRequest(ENDPOINT_MAPPINGS.getAllProjects, [
			cookies.userId,
		]);
		if (res) {
			setProjects(res?.projects);
		}
	};

	const createProject = async () => {
		const res = await makePostRequest(ENDPOINT_MAPPINGS.createProject, {
			name: title,
			description: description,
			ownerId: cookies.userId,
		});

		console.log(res);

		setModalShow(false);
		setTitle("");
		setDescription("");

		getProjects();
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="landing-wrapper container">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "10px",
					paddingRight: "10px",
				}}>
				<h1>My Projects</h1>
				<div onClick={() => setModalShow(true)}>
					<Box
						sx={{
							"& > :not(style)": {
								m: 2,
							},
						}}>
						<Tooltip title="New Project">
							<Icon
								baseClassName="fas"
								className="fa-plus-circle"
								sx={{fontSize: 50}}
								color="primary"
							/>
						</Tooltip>
					</Box>
				</div>
				<CreateProjectModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					title={title}
					handleTitleChange={handleTitleChange}
					description={description}
					handleDescriptionChange={handleDescriptionChange}
					createProject={createProject}
				/>
			</div>
			<div className="grid-wrapper">
				{projects?.length === 0 ? (
					<div>
						{" "}
						You do not have any Projects. Get started by creating
						one using the new project button.{" "}
					</div>
				) : (
					<ProjectsGrid projects={projects} />
				)}
			</div>
		</div>
	);
};

export default Landing;
