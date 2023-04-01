import axios from "axios";
import { ADD_NEW_PRODUCT_IN_SHOPPING_CART, REMOVE_PRODUCT_IN_SHOPPING_CART } from "../../utils/constants";
import { PRODUCTS_LIST_SHOPPING_CART } from "../../utils/constants";
import { setShoppingCartInGlobalState } from "../reducer/shoppingCartReducer";
import { ShoppingCartType } from "../interfaces/shoppingCartInterface";

//AramisWork: Falta el manejo de error y el tipado
export const getProductSoppingCart = (userEmail:string) => async (dispatch:any) => { 
    const productInShoppingCartDb:ShoppingCartType[] = await (await axios(`${PRODUCTS_LIST_SHOPPING_CART}?email=${userEmail}`)).data
    dispatch(setShoppingCartInGlobalState(productInShoppingCartDb));
};


export const addProductInShoppingCar = (userEmail:string,idProduct:number) => async (dispatch:any) => { 
    axios(`${ADD_NEW_PRODUCT_IN_SHOPPING_CART}?email=${userEmail}&idProduct=${idProduct}`).then(()=>{
        dispatch(getProductSoppingCart(userEmail));
    });
};

export const removeProductOfShoppingCart = (userEmail:string,idProduct:number) => async (dispatch:any) => { 
    axios(`${REMOVE_PRODUCT_IN_SHOPPING_CART}?email=${userEmail}&idProduct=${idProduct}`).then(()=>{
        dispatch(getProductSoppingCart(userEmail));
    });
};