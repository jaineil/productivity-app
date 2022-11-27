import "./App.css";
import Authentication from "./components/Authentication";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
			{/* <Authentication /> */}

			<Landing />
		</div>
	);
}

export default App;
