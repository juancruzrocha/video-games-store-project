
import axios from "axios";
import { ProductsType } from "../types";
import { LIST_PRODUCT_LIBRARY_BY_ID } from "../utils/constants";

export const getProductsOfLibraryById = async(email:string)=>{
    const productsResponse = await axios(`${LIST_PRODUCT_LIBRARY_BY_ID}/${email}`);
    const productListLibreary:ProductsType[] = await productsResponse.data;
    return productListLibreary;
};
