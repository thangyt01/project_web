import axios from "axios";
require('dotenv').config()

export const publicRequest = async (path)=>{
    return await axios.create({
        baseURL: `${process.env.REQUEST_URL}${path}`,
        timeout: 2000
    })
}

export const privateRequest = async (path)=>{
    return await axios.create({
        baseURL: `${process.env.REQUEST_URL}${path}`,
        timeout: 2000,
        headers: {
            auhthoriztion: JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token,
        }
    })
}