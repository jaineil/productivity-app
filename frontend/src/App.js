import "./App.css";
import Authentication from "./components/Authentication";
import ProjectView from "./components/ProjectView";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {Routes, Route, useLocation} from "react-router-dom";
import {Toaster} from "react-hot-toast";

function App() {
	const location = useLocation();
	return (
		<div className="App">
			{location.pathname !== "/login" && <Navbar />}
			<Routes>
				<Route path="/login" element={<Authentication />} />
				<Route path="/project/:id" element={<ProjectView />} />
				<Route index path="/" element={<Landing />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
