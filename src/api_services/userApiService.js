import { backendUrl } from "./urls";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const userLogin = async (userObj) => {
	const response = await axios.post(`${backendUrl}/user/login/`, userObj);
	return response.data;
};

const userAuth = async () => {
	const response = await axios.post(`${backendUrl}/user/auth/`);
	return response.data;
};

const userRegister = async (userObj) => {
	const response = await axios.post(`${backendUrl}/user/register/`, userObj);
	return response.data;
};

const userLogout = async () => {
	const response = await axios.post(`${backendUrl}/user/logout/`);
	return response.data;
}

export { userLogin, userAuth, userRegister, userLogout };
