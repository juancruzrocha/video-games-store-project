
import axios from "axios";
import { WishProductObj } from "../redux/interfaces/wishInterFace";
import { REMOVE_PRODUCT_TO_WISHLIST } from "../utils/constants";

export const removeProductToWishList = async (email:string,id:number) => {
    const newWishListResponse = (await axios(`${REMOVE_PRODUCT_TO_WISHLIST}?user=${email}&product=${id}`)).data;
    const newWishList: WishProductObj[] = await newWishListResponse;
    return newWishList;
} ;