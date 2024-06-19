import { backendUrl  } from "./urls";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const fetchCart = async () => {
    const response = await axios.get(`${backendUrl}/cart/fetch`);
    return response.data;
}

const insertIntoCart = async (p_id) => {
    const response = await axios.post(`${backendUrl}/cart/insert`, { p_id });
    return response.data;
}

const deleteFromCart = async (p_id) => {
    const response = await axios.delete(`${backendUrl}/cart/delete`, { params: { p_id } });
    return response.data;
}


const updateCart = async (p_id, qty_change) => {
    const response = await axios.put(`${backendUrl}/cart/update`, { p_id, qty_change});
    return response.data;
}

export { fetchCart, insertIntoCart, deleteFromCart, updateCart };