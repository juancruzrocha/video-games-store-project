export interface CardProps {
    background_image:string
    genres:string[]
    id:number
    name:string
    price:string
    state:boolean
  }

  export interface todayDiscountType {
    discount?:number
    genre?:string
  }

  export interface gameInAddShoppingCart {
    id: number
    name: string
    background_image: string
    price: string
    genres: string[]
  }
  interface ShoppingCartType {
    ProductId:number
    UserEmail:string
  }
  interface GenresElementObjType {
    created:boolean
    id:number
    name:string
    state:true
  }
  export interface itemType {
      Genres: GenresElementObjType[]
      ShoppingCart:ShoppingCartType
      background_image: string
      created:boolean
      description:string
      id: number
      name: string
      playtime:number
      price: string
      rating:string
      released:string
      state:boolean
    }