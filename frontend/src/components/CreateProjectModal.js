import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateProjectModal = (props) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header style={{border: "none"}} closeButton></Modal.Header>
			<div>
				<h3 style={{textAlign: "center"}}>Create Project</h3>
				<Form style={{padding: "4rem"}}>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlInput1">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Title"
							autoFocus
							value={props.title}
							onChange={props.handleTitleChange}
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
							value={props.description}
							onChange={props.handleDescriptionChange}
						/>
					</Form.Group>
				</Form>
			</div>
			{/* <div style={{width: "100%"}}> */}
			<Button
				style={{padding: "10px", width: "30%", alignSelf: "center"}}
				onClick={props.createProject}>
				{" "}
				Create
			</Button>
			<Modal.Footer style={{border: "none"}}></Modal.Footer>
		</Modal>
	);
};

export default CreateProjectModal;
