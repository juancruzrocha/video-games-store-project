import { User } from "../../types"
import {ShoppinCartConexion}from "../interfaces/shoppingCartInterface"
interface DataProduct {
  ShoppingCart:ShoppinCartConexion
  background_image:string
  created:boolean
  description:string
  id:number
  name:string
  playtime:number
  price:string
  rating:string
  released:string
  state:boolean

}
export interface DataUser {
  Products:DataProduct
  admin:boolean
  blocked:boolean
  email:string
  image:string
  name:string
  secret:string

}
export interface UsersReducerState{
  listUsersData: DataUser[],
  currentUser:{} // AramisWork: tengo que definir que es esto.
  idDetails: object,
  successMsg: string,
  errorMsg: string
}