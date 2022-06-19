import axios from "axios";
import { config } from "./config/config";

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
        auhthoriztion: getToken(localStorage.getItem("persist:root")),
    }
})

function getToken(key){
    if(!key) return '{}'
    const storage = JSON.parse(key)
    const user = JSON.parse(storage.user)
    if(!user.currentUser) return '{}'
    return JSON.stringify(user.currentUser.token)
}