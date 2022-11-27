import React, {useState, useRef} from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import {createReactEditorJS} from "react-editor-js";
import ReactDOM from "react-dom";

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

const EDITOR_JS_TOOLS = {
	embed: Embed,
	table: Table,
	marker: Marker,
	list: List,
	warning: Warning,
	code: Code,
	linkTool: LinkTool,
	image: Image,
	raw: Raw,
	header: Header,
	quote: Quote,
	checklist: CheckList,
	delimiter: Delimiter,
	inlineCode: InlineCode,
	simpleImage: SimpleImage,
};

const ReactEditorJS = createReactEditorJS();

const Editor = () => {
	const [editorValue, setEditorValue] = useState({
		time: new Date().getTime(),
		blocks: [
			{
				type: "header",
				data: {
					text: "Testing title",
					level: 2,
				},
			},
			{
				type: "paragraph",
				data: {
					text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
				},
			},
		],
	});

	const instanceRef = React.useRef(null);
	async function handleSave() {
		const savedData = await instanceRef.current.save();
		setEditorValue(savedData);
	}

	console.log("Rendering");
	console.log(editorValue);
	return (
		<ReactEditorJS
			onInitialize={(instance) => (instanceRef.current = instance)}
			tools={EDITOR_JS_TOOLS}
			data={{editorValue}}
			onChange={handleSave}
		/>
	);
};

export default Editor;
