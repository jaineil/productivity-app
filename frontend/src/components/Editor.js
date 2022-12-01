import React, {useState, useRef, useEffect} from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import {createReactEditorJS} from "react-editor-js";
import ReactDOM from "react-dom";
import axios from "axios";

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

import {BASE_URL, ENDPOINT_MAPPINGS} from "../utils/config";

const EDITOR_JS_TOOLS = {
	embed: Embed,
	table: Table,
	marker: Marker,
	list: List,
	warning: Warning,
	code: Code,
	linkTool: LinkTool,
	raw: Raw,
	header: Header,
	quote: Quote,
	checklist: CheckList,
	delimiter: Delimiter,
	inlineCode: InlineCode,
	simpleImage: SimpleImage,
};

const ReactEditorJS = createReactEditorJS();

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

const Editor = ({activePageId, editorValue, updateEditorValue}) => {
	const instanceRef = useRef(null);

	const handleAutoSave = async () => {
		const savedData = await instanceRef.current.save();
		updateEditorValue(savedData);
	};

	useEffect(() => {
		console.log("NEW PAGE");
	}, [activePageId]);
	console.log("RENDERING");
	console.log(editorValue);
	return (
		<>
			<ReactEditorJS
				onInitialize={(instance) => (instanceRef.current = instance)}
				tools={EDITOR_JS_TOOLS}
				defaultValue={editorValue}
				onChange={handleAutoSave}
			/>
		</>
	);
};

export default Editor;
