import "./App.css";
import Authentication from "./components/Authentication";
import ProjectView from "./components/ProjectView";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Authentication />} />
				<Route path="/project" element={<ProjectView />} />
				<Route index path="/" element={<Landing />} />
			</Routes>
			{/* <Navbar /> */}
		</div>
	);
}

export default App;
