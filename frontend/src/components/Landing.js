import React from "react";
import ProjectsGrid from "./ProjectsGrid";
import Icon from "@mui/material/Icon";

<Icon>star</Icon>;
const Landing = () => {
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
				<div>
					<Icon
						baseClassName="fas"
						className="fa-plus-circle"
						sx={{fontSize: 50}}
						color="primary"
					/>
				</div>
			</div>
			<div className="grid-wrapper">
				<ProjectsGrid />
			</div>
		</div>
	);
};

export default Landing;
