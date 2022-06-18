import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        historySearch: [],
        isFetching: false,
        error: false,
        isSuccess: false,
        errorRe: false,
        isSuccessRe: false,
        msgErr: ''
    },
    reducers:{
        loginStart: (state)=>{
            state.isFetching = true
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false
            state.currentUser = action.payload
            state.error = false
            state.isSuccess = true
        },
        loginFailure: (state)=>{
            state.isFetching = false
            state.error = true
            state.isSuccess = false
            state.currentUser = null
        },
        defaultRegister:(state)=>{
            state.isFetching = false
            state.error = false
            state.isSuccess = false
        },
        registerStart: (state)=>{
            state.isFetching = true
        },
        registerSuccess: (state)=>{
            state.isFetching = false
            state.errorRe = false
            state.isSuccessRe = true
        },
        registerFailure: (state, action)=>{
            state.isFetching = false
            state.errorRe = true
            state.msgErr = action.payload
        },
        logoutUser: (state)=>{
            state.isFetching = false
            state.currentUser = null
            state.historySearch = []
            state.error = false
            state.isSuccess = false
        },
        addHistory: (state, action)=>{
            const i = state.historySearch.findIndex(item=>item === action.payload)
            if(i >= 0) state.historySearch.splice(i, 1)
            state.historySearch = [action.payload, ...state.historySearch]
            if(state.historySearch.length > 3) state.historySearch.pop()
        },
    }
})

export const {registerStart, registerFailure, registerSuccess, 
    loginStart, loginFailure, loginSuccess, 
    logoutUser, defaultRegister, addHistory
} = 
userSlice.actions
export default userSlice.reducer