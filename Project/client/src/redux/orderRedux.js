import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "order",
    initialState:{
        isFetching: false,
        listOrder: [],
        cost: 0,
        error: false
    },
    reducers:{
        orderStart: (state)=>{
            state.isFetching = true
        },
        orderSuccess: (state, action)=>{
            state.isFetching = false
            state.error = false
            state.isPlaying = true
            state.cost += action.payload.quantity * action.payload.price
            const i = state.listOrder.findIndex(item => item.id === action.payload.id)
            if( i >= 0) {
                action.payload.quantity += state.listOrder[i].quantity
                state.listOrder.splice(i, 1) 
            }
            state.listOrder.push(action.payload)
        },
        orderFailure: (state)=>{
            state.isFetching = false
            state.error = true
        }
    }
})

export const {orderStart, orderFailure, orderSuccess
} = orderSlice.actions
export default orderSlice.reducer