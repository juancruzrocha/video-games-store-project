import axios from 'axios';

import {listProducts, productByID, errorMsg, carouselPicks, productsByFilters, saveTopRatedProducts, searchObject, setTodaysDiscount} from "../reducer/productReducer";
import { LIST_PRODUCTS, LIST_PRODUCTS_BY_FILTERS } from "../../utils/constants";
import { Game } from '../../types';

//Obtener listado de productos por filtros (actual funcion de busqueda para productos. Si no sabes como se usa, pregunta a aramis o nahuel :D)
export const getAllProducts = () => async (dispatch:any) => {
    try {
        let arrayProducts:Game[] = (await axios.get(LIST_PRODUCTS)).data;
        dispatch(listProducts(arrayProducts))
    } catch (error) {
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"))
    }
}

export const getProductsByFilters =  (filters: {},pageNumber:number) => async (dispatch: any) => {
    try{
        let listProducts:Game[] = (await axios.post(`${LIST_PRODUCTS_BY_FILTERS}?pageNumber=${pageNumber}`, filters)).data;
        dispatch(searchObject(filters))
        dispatch(productsByFilters(listProducts));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

//Obtener detalle de producto
export const getProductByID =  (id: number) => async (dispatch: any) => {
    try{
        let product:Game = (await axios.get(LIST_PRODUCTS + id)).data;
        
        dispatch(productByID(product));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

//Obtiene el listado de los productos mas gustados 
//Datos para el carousel y el resto de juegos top que se ve en la pagina principal.

export const getTopRatedProducts =  () => async (dispatch: any) => {
    try{
        let all:Game[] = (await axios.get(LIST_PRODUCTS)).data;
        let maxList:Game[] = [];
        let max:Game = {
            background_image: "",
            description: "",
            genres: [],
            id: 0,
            images: [],
            name: "",
            platforms: [],
            playtime: 0,
            price: "",
            rating: "",
            released: "",
            state: false,
            stores: [],
        } ;
        
        let turns:number = 0;
        let rest:number = 5;
        while (turns < 9){
            if(maxList.length>0){
                maxList.forEach((item: object) => {
                    all = all.filter((game: object) => game !== item)
                })
            }
            all.forEach((item: any) => {
                let substraction: number = 5 - item.rating;
                if(substraction < rest){
                    rest = substraction;
                    max = item;
                }
            })
            maxList.push(max);
            rest = 5;
            turns++;
        }
        dispatch(carouselPicks(maxList.slice(0, 3)))
        dispatch(saveTopRatedProducts(maxList.slice(3, 9)));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const setGlobalDiscount = () => async (dispatch:any) => {
    try{
        let dayName:string = (new Date).toString().slice(0,3);
        switch (dayName) {
            case 'Mon':
                dispatch(setTodaysDiscount({genre: 'Action', discount: 20}))
                break
            case 'Tue':
                dispatch(setTodaysDiscount({genre: 'Puzzle', discount: 10}))
                break;
            case 'Wed':
                dispatch(setTodaysDiscount({genre: 'Action', discount: 20}))
                break;
            case 'Thu':
                dispatch(setTodaysDiscount({genre: 'Action', discount: 50}))
                break;
            case 'Fri':
                dispatch(setTodaysDiscount({genre: 'Sports', discount: 50}))
                break;
            case 'Sat':
                dispatch(setTodaysDiscount({genre: 'Shooter', discount: 30}))
                break;
            default:
                dispatch(setTodaysDiscount({genre: 'No_Discount', discount: 100}))
                break;
        }
    } catch (error) {
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

