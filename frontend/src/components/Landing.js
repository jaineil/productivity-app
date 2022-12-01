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
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Search = styled("div")(({theme}) => ({
	position: "relative",
	borderRadius: "10px",

	backgroundColor: alpha(theme.palette.common.black, 0.05),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.black, 0.15),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
	fontSize: "24px",
	minHeight: "5rem",
	minWidth: "35rem",
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const Landing = () => {
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [cookies, setCookie] = useCookies(["userId"]);
	const [projects, setProjects] = useState([]);
	const [searchText, setSearchText] = React.useState();

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

	// const [cookies, setCookie] = useCookies(["userId"]);

	const getProjects = async () => {
		const res = await makeGetRequest(ENDPOINT_MAPPINGS.getAllProjects, [
			cookies.userId,
		]);
		console.log("asdads", res);

		if (res) {
			let proj = [];
			for (let i = 0; i < res?.projects.length; i++) {
				proj.push((res?.projects)[i].projectId);
			}
			setProjects(proj);
		}
	};

	const searchProjects = async (searchText) => {
		const res = await makeGetRequest(ENDPOINT_MAPPINGS.searchProjects, [
			cookies.userId,
			searchText,
		]);
		console.log(res);
		if (res) {
			setProjects(res);
		}
		// setProjects(res?.projects);
	};
	const createProject = async () => {
		const res = await makePostRequest(ENDPOINT_MAPPINGS.createProject, {
			name: title,
			description: description,
			ownerId: cookies.userId,
		});

		toast.success(`Created new project ${title}`);

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
					margin: "2px 300px",
				}}>
				<Search style={{display: "flex"}}>
					<SearchIconWrapper>
						<SearchIcon sx={{width: "40px"}} />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{"aria-label": "search"}}
						sx={{
							height: "100%",
							width: "100%",
							padding: "20px",
							textAlign: "left",
							borderRadius: "40px",
						}}
						onChange={(e) => {
							console.log(searchText);
							setSearchText(e.target.value);
						}}
						value={searchText}
					/>
					<ArrowForwardIcon
						sx={{
							// backgroundColor: "black",
							fontSize: "30px",
							marginTop: "25px",
							marginRight: "20px",
						}}
						onClick={(e) => {
							searchProjects(searchText);
							setSearchText("");
						}}
					/>
				</Search>
			</div>
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
