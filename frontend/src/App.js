import "./App.css";
import Authentication from "./components/Authentication";
import ProjectView from "./components/ProjectView";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {Routes, Route, useLocation} from "react-router-dom";
import {Toaster} from "react-hot-toast";
// import {useState} from "react";
// import {useCookies} from "react-cookie";
// import {makeGetRequest} from "./utils/makeRequest";
// import {ENDPOINT_MAPPINGS} from "./utils/config";

function App() {
	const location = useLocation();
	// const [projects, setProjects] = useState([]);
	// const [cookies, setCookie] = useCookies(["userId"]);

	// const getProjects = async () => {
	// 	const res = await makeGetRequest(ENDPOINT_MAPPINGS.getAllProjects, [
	// 		cookies.userId,
	// 	]);
	// 	console.log("asdads", res);

	// 	if (res) {
	// 		let proj = [];
	// 		for (let i = 0; i < res?.projects.length; i++) {
	// 			proj.push((res?.projects)[i].projectId);
	// 		}
	// 		setProjects(proj);
	// 	}
	// };

	// const searchProjects = async (searchText) => {
	// 	const res = await makeGetRequest(ENDPOINT_MAPPINGS.searchProjects, [
	// 		cookies.userId,
	// 		searchText,
	// 	]);
	// 	console.log(res);
	// 	if (res) {
	// 		setProjects(res);
	// 	}
	// 	// setProjects(res?.projects);
	// };
	return (
		<div className="App">
			{location.pathname !== "/login" && <Navbar />}
			<Routes>
				<Route path="/login" element={<Authentication />} />
				<Route path="/project/:id" element={<ProjectView />} />
				<Route
					index
					path="/"
					element={
						<Landing
						// projects={projects}
						// getProjects={() => getProjects()}
						/>
					}
				/>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
