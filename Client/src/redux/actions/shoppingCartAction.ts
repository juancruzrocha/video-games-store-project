import axios from "axios";
import { 
    addingToShoppingCart, 
    deletingItemShoppingCart, 
    errorMsg, 
    updateShoppingCartUser ,
    eraseGuestShoppingCart,
    userShoppingDBemptyByHand,
} from "../reducer/shoppingCartReducer";
import {gameParamType, ShoppingCartType} from "../interfaces/shoppingCartInterface"
import {ADD_NEW_PRODUCT_IN_SHOPPING_CART, PRODUCTS_LIST_SHOPPING_CART, REMOVE_PRODUCT_IN_SHOPPING_CART} from "../../utils/constants";

export const addShoppingCart =  (game:gameParamType) => async (dispatch: any) => {
    try{
         dispatch(addingToShoppingCart(game));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const deleteItemShoppingCart =  (id: string) => (dispatch: any) => {
    try{
        dispatch(deletingItemShoppingCart(id));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const addNewProductInShoppingCart =  (id:any, email:any) => async (dispatch: any) => {
    try{
        await axios.get(ADD_NEW_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`);
        let carrito:ShoppingCartType[] = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const removeProductoInShoppingCar =  (id:number, email:string) => async (dispatch: any) => {
    try{
        let carrito:ShoppingCartType[] = (await axios.get(REMOVE_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`)).data;
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

// Aramis: esto parece no estar en uso, deberia borrarse.
export const moveProductsFromGuestCartToUserCart = (email:string, carritoGuest:any) => async (dispatch:any) => {
    try{
        console.log(carritoGuest," soy el carrito guest")
        carritoGuest.ForEach((item:ShoppingCartType) => addNewProductInShoppingCart(item.id, email)) //Aramis:tenian una funcion para grabar todos los productor de una en la db
        dispatch(eraseGuestShoppingCart())
    } catch (error) {
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const getShoppingCartUserFromDB = (email: string) => async(dispatch:any) => {
    console.log(email,"soy el email ")
    try {
        let carrito:ShoppingCartType[] = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;  
        if(carrito.length>0){
                dispatch(userShoppingDBemptyByHand(false));
            } else {
                dispatch(userShoppingDBemptyByHand(true))
            }
        dispatch(updateShoppingCartUser(carrito));
    } catch (error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

