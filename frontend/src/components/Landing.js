import React from "react";
import {loadCSS} from "fg-loadcss";
import ProjectsGrid from "./ProjectsGrid";
import Icon from "@mui/material/Icon";
import {Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CreateProjectModal from "./CreateProjectModal";

const Landing = () => {
	React.useEffect(() => {
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

	const [modalShow, setModalShow] = React.useState(false);
	const [title, setTitle] = React.useState();
	const [description, setDescription] = React.useState();

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

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
				/>
			</div>
			<div className="grid-wrapper">
				<ProjectsGrid />
			</div>
		</div>
	);
};

export default Landing;
