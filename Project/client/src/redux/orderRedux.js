import {createSlice} from '@reduxjs/toolkit'
import { getPrice } from '../helpers/utils'

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
            state.cost += action.payload.quantity * getPrice(action.payload.price) * (1 - action.payload.discount/100)
            const i = state.listOrder.findIndex(item => item.id === action.payload.id && item.color === action.payload.color)
            if( i >= 0) {
                action.payload.quantity += state.listOrder[i].quantity
                state.listOrder.splice(i, 1) 
            }
            state.listOrder.push(action.payload)
        },
        orderFailure: (state)=>{
            state.isFetching = false
            state.error = true
        },
        orderAdd: (state, action)=>{
            const i = state.listOrder.findIndex(item => item.id === action.payload.id && item.color === action.payload.color)
            if(i < 0) return 
            state.listOrder[i].quantity += 1
            state.cost += getPrice(action.payload.price) * (1 - action.payload.discount/100)
        },
        orderSub: (state, action)=>{
            const i = state.listOrder.findIndex(item => item.id === action.payload.id && item.color === action.payload.color)
            if(i < 0) return 
            state.cost -= getPrice(action.payload.price) * (1 - action.payload.discount/100)
            if(state.listOrder[i].quantity > 1) state.listOrder[i].quantity -= 1
            else state.listOrder.splice(i, 1)
        },
        orderDelete: (state, action)=>{
            const i = state.listOrder.findIndex(item => item.id === action.payload.id && item.color === action.payload.color)
            if(i < 0) return
            state.cost -= action.payload.quantity * getPrice(action.payload.price) * (1 - action.payload.discount/100)
            state.listOrder.splice(i, 1)
        }
    }
})

export const {orderStart, orderFailure, orderSuccess, orderAdd, orderSub, orderDelete
} = orderSlice.actions
export default orderSlice.reducer