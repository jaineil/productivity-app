import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {ProSidebarProvider} from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ProSidebarProvider>
		<App />
	</ProSidebarProvider>
);
