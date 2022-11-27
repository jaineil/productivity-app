import React from "react";
import {Sidebar, Menu, MenuItem, SubMenu, MenuItemFR} from "react-pro-sidebar";
import {Button, Container, Row, Col} from "react-bootstrap";
import Editor from "./Editor";

const ProjectView = () => {
	return (
		<Container fluid>
			<Row>
				<Col
					xs={2}
					className="border-end border-dark border-2"
					style={{height: "100vh"}}>
					<div style={{height: "90vh"}}>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Master Project</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">System Design</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Leetcode</p>
						</Row>
						<Row className="my-2 px-2">
							<p className="text-center fs-6">Web UI Design</p>
						</Row>
					</div>
					<Row className="my-2 px-2 py-3 border-top border-dark border-1">
						<p className="text-center fs-5">+ New Page</p>
					</Row>
				</Col>
				<Col xs={10}>
					<Row>
						<p className="display-4">Master Project</p>
					</Row>
					<Editor />
				</Col>
			</Row>
		</Container>
	);
};

export default ProjectView;
