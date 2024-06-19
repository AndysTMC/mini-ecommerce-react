import { backendUrl } from "./urls";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";


const userLogin = async (userObj) => {
    const response = await fetch(`${backendUrl}/user/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
    });
    return response.json();
}

const userAuth = async () => {
    const response = await axios.post(`${backendUrl}/user/auth/`);
    return response.data;
}

const userRegister = async (userObj) => {
    const response = await axios.post(`${backendUrl}/user/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
    });
    return response.data;
}

export { userLogin, userAuth, userRegister };