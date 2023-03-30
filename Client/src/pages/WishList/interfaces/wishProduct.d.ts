
export interface wishCard{
    id:number,
    name:string,
    email:string,
    background_image:string,
    price:string
    released:string
}


export interface RelationModels {
    ProductId: number;
    UserEmail: string;
  }
 export interface WishProductObj {
    WishlistProduct: RelationModels;
    created: boolean;
    description: string;
    id: number;
    name: string;
    playtime: number;
    price: string;
    rating: string;
    released: string;
    state: boolean;
  }