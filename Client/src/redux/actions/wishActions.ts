
import axios from 'axios';
import { LIST_WISH } from '../../utils/constants';
import {setwishList} from "../../redux/reducer/wishReducer"; 
import { WishProductObj } from "../interfaces/wishInterFace";


export const getAllProductInWishList =  (emailUser: string) => async (dispatch: any) => {
    try {
        const wishListResponse = await axios(`${LIST_WISH}?email=${emailUser}`);
        const wishList:WishProductObj[] = await wishListResponse.data;
        dispatch(setwishList(wishList));
    } catch (error) {
        console.log("soy el error wish",error);
    };
};  


