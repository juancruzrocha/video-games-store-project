import { createSlice } from "@reduxjs/toolkit";

import { shoppingCartReducerState } from "../interfaces/shoppingCartInterface";


const initialState = {
    productListShoopingCart:[]
}

export const shoppingCartReducer = createSlice({
    name: "shoppingCartReducer",
    initialState,
    reducers:{
        getProductSoppingCart: (state, action) => {
            state.productListShoopingCart = action.payload;
        },
        
    }
})

export const {
    // getProductSoppingCart
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer