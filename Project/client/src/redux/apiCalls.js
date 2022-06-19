import { loginFailure, loginStart, loginSuccess, logoutUser, registerFailure, registerStart, registerSuccess } from "./userRedux"
import {  } from "./orderRedux"
import { publicRequest } from "../requestAxios"

export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/api/auth/login', user)
        dispatch(loginSuccess(res.data))
    }catch(e){
        if(e.response.data.code !== 200){
            dispatch(loginFailure())
        }else{
            dispatch(loginSuccess(e.response.data.data))
        }
    }
}

export const register = async(dispatch, user)=>{
    dispatch(registerStart())
    try{
        const res = await publicRequest.post("/api/auth/register", user)
        dispatch(registerSuccess(res.data))
    }catch(e){
        if(e.response.data.code !== 200){
            dispatch(registerFailure(e.response.data.message))
        }else{
            dispatch(registerSuccess())
        }
    }
}

export const logout = async(dispatch)=>{
    dispatch(logoutUser())
}
