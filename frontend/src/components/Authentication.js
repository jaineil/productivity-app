import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Authentication = () => {
	return (
		<div
			style={{
				backgroundImage:
					"url(" +
					"https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" +
					")",
				minHeight: "100vh",
				paddingTop: "10%",
			}}>
			<div className="auth-wrapper">
				<Tabs
					defaultActiveKey="login"
					id="justify-tab-example"
					className="mb-3"
					justify>
					<Tab eventKey="login" title="Login">
						<LoginForm />
					</Tab>
					<Tab eventKey="signUp" title="Signup">
						<SignUpForm />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default Authentication;
