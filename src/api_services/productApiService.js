import { backendUrl } from "./urls";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const fetchAllProducts = async () => {
    const response = await axios.get(`${backendUrl}/product/fetch_all`);
    return response.data;
}

const fetchProduct = async (p_id) => {
    const response = await axios.get(`${backendUrl}/product/fetch/`, {
        body: JSON.stringify({ p_id: p_id }),
    });
    return response.data;
}

export { fetchAllProducts, fetchProduct}