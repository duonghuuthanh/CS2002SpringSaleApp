import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/SaleAppV1";
const SERVER = "http://localhost:8085";

export const endpoints = {
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "products": `${SERVER_CONTEXT}/api/products/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "pay": `${SERVER_CONTEXT}/api/pay/`,
    "details": (id) => `${SERVER_CONTEXT}/api/products/${id}/`,
    "comments": (id) => `${SERVER_CONTEXT}/api/products/${id}/comments/`,
    "add-comment": `${SERVER_CONTEXT}/api/comments/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token")
        }
    });
}

export default axios.create({
    baseURL: SERVER
});