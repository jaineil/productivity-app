import axios from "axios";
import {BASE_URL} from "./config";

export const makeGetRequest = async (routePath, paramList) => {
	let requestUrl = `${BASE_URL}${routePath}`;
	for (const param of paramList) {
		requestUrl += `/${param}`;
	}
	try {
		const response = await axios.get(requestUrl);
		console.log(`Fetched response for API request: ${requestUrl}`);
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.log(`Error occured: ${err}`);
		return;
	}
};

export const makePostRequest = async (routePath, paramObj) => {
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
