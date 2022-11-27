import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = () => {
	const x = [1, 2, 3, 4, 4, 3, 2, 1, 2, 12];
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				"& > :not(style)": {
					m: 1,
					width: "15rem",
					height: "20rem",
				},
			}}>
			{/* <Paper elevation={4} /> */}
			{x.map((i) => {
				return <ProjectCard />;
			})}
		</Box>
	);
};

export default ProjectsGrid;
