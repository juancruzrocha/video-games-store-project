import { createSlice } from "@reduxjs/toolkit";

import { UsersReducerState } from "../interfaces/userInterface";

//Aramis: Nop puedo tipar todo porque hay cosas que parecen no servir.
const initialState: UsersReducerState = {
    listUsersData:[],
    idDetails: {},
    successMsg: "",
    errorMsg: ""
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        listUser: (state, action) => {
            state.listUsersData = action.payload;
        },
        //Aramis:Esto parece no hacer nada, viene ligado con una accion que debio ser un controllador.
        userByID: (state, action) => {
            state.idDetails = action.payload;
        },
        //Aramis:Estos mensajes parecen estar sin funcionalidad, podrian ser utiles       
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        //Aramis:Estos mensajes parecen estar sin funcionalidad, podrian ser utiles   
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const { listUser, userByID, successMsg, errorMsg } = userReducer.actions;
export default userReducer.reducer