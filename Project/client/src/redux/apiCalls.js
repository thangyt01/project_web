import { loginFailure, loginStart, loginSuccess, logoutUser, registerFailure, registerStart, registerSuccess } from "./userRedux"
import {  } from "./orderRedux"
import { publicRequest } from "../requestAxios"

export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/api/auth/login', user)
        dispatch(loginSuccess(res.data))
    }catch(e){
        dispatch(loginFailure())
    }
}

export const register = async(dispatch, user)=>{
    dispatch(registerStart())
    try{
        const res = await publicRequest.post("/api/auth/register", user)
        dispatch(registerSuccess(res.data))
    }catch(e){
        dispatch(registerFailure())
    }
}

export const logout = async(dispatch)=>{
    dispatch(logoutUser())
}
