import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {makePostRequest} from "../utils/makeRequest";
import toast from "react-hot-toast";
// import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const loginUser = async () => {
		const user = await makePostRequest(ENDPOINT_MAPPINGS.login, {
			email: email,
			password: password,
		});

		if (user) {
			toast.success("Sucessfully Authenticated");
			navigate("/");
		} else {
			toast.error("Incorrect Credentials");
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="login-wrapper">
			<Form>
				<Form.Group className="mb-3" controlId="loginformBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={handleEmailChange}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="loginformBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						placeholder="Password"
						onChange={handlePasswordChange}
					/>
				</Form.Group>
			</Form>
			<Button variant="primary" type="button" onClick={loginUser}>
				Login
			</Button>
		</div>
	);
};

export default LoginForm;
