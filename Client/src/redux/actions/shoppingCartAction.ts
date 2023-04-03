import axios from "axios";
import { ADD_NEW_PRODUCT_IN_SHOPPING_CART, REMOVE_PRODUCT_IN_SHOPPING_CART } from "../../utils/constants";
import { PRODUCTS_LIST_SHOPPING_CART } from "../../utils/constants";
import { setShoppingCartInGlobalState } from "../reducer/shoppingCartReducer";
import { ShoppingCartType } from "../interfaces/shoppingCartInterface";
import { chargeShoppingCartGuestInDb, localStorageProducts, saveProductShoopingCartInLocalStorage,removeProductShoopingCartInLocalStorage } from '../../../../Api/src/controllers/shoppingCart/shoppingCartController';
import { CardPropsType } from "../../types";

//AramisWork: Falta el manejo de error y el tipado
export const getProductSoppingCart = (userEmail:string) => async (dispatch:any) => {
	if(userEmail !== "noLoginUser"){
		console.log("aqui podemos visualizar un bucle, mira las aclaraciones de card")
		chargeShoppingCartGuestInDb(userEmail).then(async ()=> {
			const productInShoppingCartDb:ShoppingCartType[] = await (await axios(`${PRODUCTS_LIST_SHOPPING_CART}?email=${userEmail}`)).data
			dispatch(setShoppingCartInGlobalState(productInShoppingCartDb));
			window.localStorage.removeItem("shoopingCartGuest");
		});
		return
	};
		//AramisWork:Debemos guaradar los productos y no los id
		let productSaveInLocalStorageString:string | null = window.localStorage.getItem("shoopingCartGuest");
		if(productSaveInLocalStorageString){
			const productSaveInLocalStorageObject:localStorageProducts = JSON.parse(productSaveInLocalStorageString);
			dispatch(setShoppingCartInGlobalState(productSaveInLocalStorageObject.dataProducts));
		};
	};

export const addProductInShoppingCart = (userEmail:string,idProduct:number,dataProduct:CardPropsType) => async (dispatch:any) => { 
    if(userEmail !== "noLoginUser"){
        axios(`${ADD_NEW_PRODUCT_IN_SHOPPING_CART}?email=${userEmail}&idProduct=${idProduct}`).then((newShoppingCartList) =>{
            dispatch(setShoppingCartInGlobalState(newShoppingCartList.data));
        });
		return; 
	};
    //AramisWork:tengo que ver si esto se ejecuta cuando hay un usuario, no deberia. Este  error que marca es por este tema
	saveProductShoopingCartInLocalStorage(idProduct,dataProduct);
	dispatch(getProductSoppingCart(userEmail));
};

export const removeProductOfShoppingCart = (userEmail:string,idProduct:number) => async (dispatch:any) => { 
	if(userEmail !== "noLoginUser"){
		axios(`${REMOVE_PRODUCT_IN_SHOPPING_CART}?email=${userEmail}&idProduct=${idProduct}`).then((newShoppingCartList)=>{
			dispatch(setShoppingCartInGlobalState(newShoppingCartList.data));
		});
		return;
	};
	removeProductShoopingCartInLocalStorage(idProduct);
	dispatch(getProductSoppingCart(userEmail));
};

