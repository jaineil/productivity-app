import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({projects}) => {
	// console.log(typeof projects);
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
			{projects?.map((project) => {
				return (
					<ProjectCard
						key={project?._id}
						id={project?._id}
						title={project?.name}
						description={project?.description}
					/>
				);
			})}
		</Box>
	);
};

export default ProjectsGrid;
