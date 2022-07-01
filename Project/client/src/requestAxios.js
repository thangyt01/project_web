import axios from "axios";
import { config } from "./config/config";
import { getToken } from "./helpers/utils";

export const publicRequest = axios.create({
    baseURL: `${config.REQUEST_URL}`,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const privateRequest = axios.create({
    baseURL: `${config.REQUEST_URL}`,
    timeout: 2000,
    headers: {
        authorization: getToken(localStorage.getItem("persist:root")),
    }
})