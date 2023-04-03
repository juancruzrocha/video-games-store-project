
export interface ShoppinCartConexion {
    ProductId:number
    UserEmail:string
  }
interface ProductyGenresTypes {
    GenreId:number
    ProductId:number
}
interface GenresTypes {
    ProductsGenres:ProductyGenresTypes
    created:boolean
    id:number
    name:string
    state:boolean
}
export interface ShoppingCartType {
    Genres:GenresTypes
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
export interface ShoppingCartTypeLocalStorage {
    id:number
    name:string
    price:string
    genres:string[]
    state:boolean

}

export interface gameParamType {
    background_image:string
    genres:string[]
    id:number
    name:string
    price:string
}

export interface shoppingCartReducerState{
    productListShoopingCart: ShoppingCartType[], //capaz que deberia agregar esta interface que aplica cuando no hay usuarios | ShoppingCartTypeLocalStorage[]

}
