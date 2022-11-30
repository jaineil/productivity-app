import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {makePostRequest} from "../utils/makeRequest";
import toast, {Toaster} from "react-hot-toast";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const success = (msg) => toast.success(msg);
	const error = (msg) => toast.error(msg);

	const createUser = async () => {
		const res = await makePostRequest(ENDPOINT_MAPPINGS.createUser, {
			name: firstName + " " + lastName,
			email: email,
			password: password,
		});
		if (res) {
			console.log("New user created");
			success("New user created");
		} else {
			console.log("Could not create user. Please try again");
			error("Could not create user. Please try again");
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleFirstNameChange = (e) => {
		setFirstName(e.target.value);
	};
	const handleLastNameChange = (e) => {
		setLastName(e.target.value);
	};

	return (
		<div className="sign-up-wrapper">
			<Form>
				<Form.Group className="mb-4" controlId="formBasicFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter first name"
						value={firstName}
						onChange={handleFirstNameChange}
					/>
				</Form.Group>
				<Form.Group className="mb-4" controlId="formBasicLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="name"
						value={lastName}
						placeholder="Enter last name"
						onChange={handleLastNameChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email </Form.Label>
					<Form.Control
						type="email"
						value={email}
						placeholder="Enter email"
						onChange={handleEmailChange}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-5" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						placeholder="Password"
						onChange={handlePasswordChange}
					/>
				</Form.Group>
				<Button variant="primary" type="button" onClick={createUser}>
					Create Account
				</Button>
				<Toaster />
			</Form>
		</div>
	);
};

export default SignUpForm;
