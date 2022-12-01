import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions} from "@mui/material";
import ProjectView from "./ProjectView";
import {Link} from "react-router-dom";

export default function ProjectCard({id, title, description}) {
	console.log(id, title, description);
	return (
		<Card sx={{maxWidth: 345, minHeight: "100%"}}>
			<Link
				style={{textDecoration: "none", minHeight: "100%"}}
				to={`/project/${id}`}
				state={{projectId: id}}>
				<CardActionArea
					sx={{
						minHeight: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
					}}>
					<CardMedia
						component="img"
						height="140"
						image="assets/project-cover-default.jpg"
						alt="green iguana"
					/>
					<CardContent sx={{width: "100%"}}>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{wordWrap: "break-word", overflow: "clip"}}>
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<CardActions></CardActions>
		</Card>
	);
}
