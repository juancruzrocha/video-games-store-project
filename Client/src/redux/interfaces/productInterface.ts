import { Game } from "../../types";

interface OrderFiltersTypes {
    alphabetic:string
    price:string
}
interface FiltersOrder {
    genres: number[]
    platform:number[]
    priceRange:number[]
}
interface SearchObjTypes {
    name:string
    filters: FiltersOrder
    order: OrderFiltersTypes
}
export interface productReducerState{
    allProductsData: Game[]
    searchedData: Game[],
    details: object,
    topProductsData: Game[],
    carouselData: Game[],
    searchObject: SearchObjTypes | {}
    searchedName: string,
    selectedFilterGenreData: number[],
    selectedFilterPlatformData: number[],
    selectedFilterPriceRangeData: number[],
    selectedAlphabeticOrderData: string,
    selectedPriceOrderData: string,
    todaysDiscount: object,
    discountGloballyApplied: boolean,
    adminDiscount: boolean,
    successMsg: string,
    errorMsg: string
}

