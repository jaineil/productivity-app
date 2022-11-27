import "./App.css";
import Authentication from "./components/Authentication";
import ProjectView from "./components/ProjectView";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			{/* <Authentication /> */}
			<ProjectView />
			<Navbar />
			<Landing />
		</div>
	);
}

export default App;
