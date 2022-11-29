import React, {useEffect, useState} from "react";
import {
	Container,
	Row,
	Col,
	Dropdown,
	Form,
	Button,
	Modal,
} from "react-bootstrap";
import {ENDPOINT_MAPPINGS} from "../utils/config";
import {makeGetRequest, makePostRequest} from "../utils/makeRequest";
import Editor from "./Editor";
import {BsFillPeopleFill} from "react-icons/bs";

const defaultPageBody = {
	time: new Date().getTime(),
	blocks: [
		{
			id: "Mfafaffdsg",
			type: "paragraph",
			data: {
				text: "start typing here ...",
			},
		},
	],
	version: "2.25.0",
};

const PageView = ({activePageId}) => {
	const [pageTitle, setPageTitle] = useState("");
	const [pageBody, setPageBody] = useState({});
	const [editorValue, setEditorValue] = useState({});

	const updatePageBody = async () => {
		console.log("UPDATING PAGE");
		console.log(activePageId);
		console.log(editorValue);
		console.log(pageTitle);
		await makePostRequest(ENDPOINT_MAPPINGS.updatePage, {
			pageId: activePageId,
			title: pageTitle,
			body: JSON.stringify(editorValue),
		});
		window.location.reload();
	};

	const fetchPageDetails = async () => {
		const page = await makeGetRequest(ENDPOINT_MAPPINGS.getPageDetails, [
			activePageId,
		]);
		if (page) {
			setPageTitle(page[0]["pages"]["title"]);
			setPageBody(JSON.parse(page[0]["pages"]["body"]));
			setEditorValue(JSON.parse(page[0]["pages"]["body"]));
		}
	};

	useEffect(() => {
		console.log("USE EFFECT [PageView]");
		fetchPageDetails();
	}, [activePageId]);

	console.log("Rendering [PageView]");
	console.log(pageBody);
	return (
		<>
			<Row className="mx-3 my-2 pt-3">
				<Col xs={10}>
					<p className="display-4">{pageTitle}</p>
				</Col>
				<Col xs={2}>
					<Button variant="outline-primary" onClick={updatePageBody}>
						Save progress
					</Button>
				</Col>
			</Row>
			{Object.keys(editorValue).length > 0 ? (
				<Editor
					activePageId={activePageId}
					editorValue={editorValue}
					updateEditorValue={setEditorValue}
				/>
			) : (
				""
			)}
		</>
	);
};

export default PageView;
