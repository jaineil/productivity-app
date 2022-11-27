import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions} from "@mui/material";

export default function ProjectCard() {
	return (
		<Card sx={{maxWidth: 345}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image="assets/project-cover-default.jpg"
					alt="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Project Title
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Project Description
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
		</Card>
	);
}
