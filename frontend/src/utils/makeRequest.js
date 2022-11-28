import axios from "axios";
import {BASE_URL} from "./config";

const makeGetRequest = async (routePath, paramList) => {
	let requestUrl = `${BASE_URL}${routePath}`;
	for (const param in paramList) {
		requestUrl += `/${param}`;
	}
	try {
		const response = await axios.get(requestUrl);
		console.log(`Fetched response for API request: ${requestUrl}`);
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.log(`Error occured: ${err}`);
	}
};

const makePostRequest = async (routePath, paramObj) => {
	let requestUrl = `${BASE_URL}${routePath}`;
	try {
		const response = await axios.post(requestUrl, paramObj);
		console.log(`Fetched response for API request: ${requestUrl}`);
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.log(`Error occured: ${err}`);
	}
};
