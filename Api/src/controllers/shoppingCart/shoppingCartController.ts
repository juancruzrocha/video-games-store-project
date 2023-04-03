import axios from "axios";
import { SAVE_SHOPPINGCART_LOCALSTORAGE_IN_DB } from "../../../../Client/src/utils/constants";
import { CardPropsType } from "../../../../Client/src/types";
//AramisWork:Esto es un controller y no deberia de ir aqui
export interface localStorageProducts {
    idProducts:number[]
    dataProducts:CardPropsType[]
}
export const saveProductShoopingCartInLocalStorage = (idProduct:number,dataProduct:CardPropsType) => {
    let productSaveInLocalStorag:string | null = window.localStorage.getItem("shoopingCartGuest");
    //Guardamos los primeros elementos en L.S
    if(!productSaveInLocalStorag) {
        window.localStorage.setItem("shoopingCartGuest",JSON.stringify({
            idProducts:[idProduct],
            dataProducts:[dataProduct]
        }));
        
        return;
    }
    const objProductLocalSotrag: localStorageProducts = JSON.parse(productSaveInLocalStorag);
    if(!objProductLocalSotrag.idProducts.includes(idProduct)){
        objProductLocalSotrag.idProducts.push(idProduct);
        objProductLocalSotrag.dataProducts.push(dataProduct);
        window.localStorage.setItem("shoopingCartGuest",JSON.stringify(objProductLocalSotrag));
        return objProductLocalSotrag;
    };
};
export const removeProductShoopingCartInLocalStorage = (idProduct:number) => {
    const productSaveInLocalStorage:string | null = window.localStorage.getItem("shoopingCartGuest")
    if(productSaveInLocalStorage){
        const objProductLocalSotrage: localStorageProducts = JSON.parse(productSaveInLocalStorage);
        const newListId = objProductLocalSotrage.idProducts.filter((id:number) => id !== idProduct);
        const newListDataProducts = objProductLocalSotrage.dataProducts.filter((dataProduct) => dataProduct.id !== idProduct);
        objProductLocalSotrage.dataProducts = newListDataProducts;
        objProductLocalSotrage.idProducts = newListId;
        window.localStorage.setItem("shoopingCartGuest",JSON.stringify(objProductLocalSotrage));
        return objProductLocalSotrage;
    };
};

export const chargeShoppingCartGuestInDb = async (emailUser:String) => {
    
    const productSaveInLocalStorageString:string | null = window.localStorage.getItem("shoopingCartGuest");
    console.log(productSaveInLocalStorageString)
    if(!productSaveInLocalStorageString) return "not found product in localStorage" //Aramis: Esta doble pregunta es por temas de typeScript.
    const  productSaveInLocalStorageObject:localStorageProducts = JSON.parse(productSaveInLocalStorageString);
    if(!productSaveInLocalStorageObject.idProducts.length) return "not found product in localStorage" 
    const bodyObject = {
        arrayAllProductInShoppingCart:productSaveInLocalStorageObject.idProducts,
        emailUser:emailUser
    };
    await axios.post(`${SAVE_SHOPPINGCART_LOCALSTORAGE_IN_DB}`,bodyObject);
    return "Product was charged in Db";
};