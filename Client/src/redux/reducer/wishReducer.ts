
import { createSlice } from "@reduxjs/toolkit";

import { WishReducerState } from "../interfaces/wishInterFace";

const initialState: WishReducerState = {
    wishList: [],
};


export const wishReducer = createSlice({
    name: "wishReducer",
    initialState,
    reducers:{
        setwishList: (state, action) => {
            state.wishList= action.payload;
        },
    }
});

export const  {
    setwishList,
} = wishReducer.actions;

export default wishReducer.reducer;