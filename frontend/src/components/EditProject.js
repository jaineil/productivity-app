import React, {useState} from "react";
import {Form} from "react-bootstrap";

const EditProject = () => {
	const [newTitle, setNewTitle] = useState();
	const [newDescription, setNewDescription] = useState();

	const handleUpdate = () => {
		// const res = await
	};

	return (
		<div>
			<Form style={{padding: "4rem"}}>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Title"
						autoFocus
						value={newTitle}
						onChange={(e) => {
							setNewTitle(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlTextarea1">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Description"
						rows={5}
						value={newDescription}
						onChange={(e) => {
							setNewDescription(e.target.value);
						}}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default EditProject;
