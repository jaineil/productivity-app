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
				backgroundSize: "cover",
				minHeight: "100vh",
				paddingTop: "10%",
			}}>
			<div
				style={{
					width: "max-content",
					marginLeft: "auto",
					marginRight: "auto",
					borderRadius: "20px",
					textAlign: "center",
					boxShadow: "2px 2px 20px grey",
				}}>
				<img
					width={350}
					height={200}
					style={{borderRadius: "20px"}}
					src="/assets/prod.png"
					alt="prod"></img>
			</div>

			<br></br>
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
