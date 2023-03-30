import axios from 'axios';

import { listUser, userByID, errorMsg,  } from "../reducer/userReducer";
import { LIST_USERS, ADD_NEW_USER } from "../../utils/constants";
import { DataUser } from '../interfaces/userInterface';

export const getListUsers =  () => async (dispatch: any) => {
    try{
        let arrayUsers:DataUser[] = (await axios.get(LIST_USERS)).data;
        dispatch(listUser(arrayUsers));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

//Aramis:esto no se usa y por eso no esta tipado.
export const getUserByID =  (id: string) => async (dispatch: any) => {
    let user: {};
    try{
        user = await  (await axios.get(LIST_USERS + id)).data; 
        dispatch(userByID(user));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

//crear y agregar usuario nuevo
//Aramis: Esto no deberia ser  una action si no se lo usa de forma global.
export const saveNewUser =  (email: string, name:string, picture:string) => async (dispatch: any) => {
    try{
        let user = (await axios.get(ADD_NEW_USER + `?email=${email}&name=${name}&image=${picture}`)).data;
        console.log(user,"Aramis: Hay un error en el back cuando el usuario ya existe pero no tira la pagina")
        if(user.name){
        dispatch(userByID(user));
        }
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}