import { createSlice } from "@reduxjs/toolkit";

import { shoppingCartReducerState } from "../interfaces/shoppingCartInterface";


const initialState: shoppingCartReducerState= {
    productListShoopingCart:[]
}

export const shoppingCartReducer = createSlice({
    name: "shoppingCartReducer",
    initialState,
    reducers:{
        setShoppingCartInGlobalState: (state, action) => {
            state.productListShoopingCart = action.payload;
        },
        
    }
})

export const {
    setShoppingCartInGlobalState
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer