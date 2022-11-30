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
		<Card sx={{maxWidth: 345}}>
			<Link to={`/project/${id}`}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image="assets/project-cover-default.jpg"
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
		</Card>
	);
}
