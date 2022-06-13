import axios from "axios";
import { config } from "./config/config";

export const publicRequest = axios.create({
        baseURL: `${config.REQUEST_URL}`,
        timeout: 2000,
        headers: {
            'Content-Type': 'application/json'
        }
})

export const privateRequest = async (path)=>{
    return await axios.create({

        baseURL: `${config.REQUEST_URL}${path}`,
        timeout: 2000,
        headers: {
            auhthoriztion: JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token,
        }
    })
}