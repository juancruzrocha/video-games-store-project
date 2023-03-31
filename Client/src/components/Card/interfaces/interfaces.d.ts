export interface CardProps {
    background_image:string
    genres:string[]
    id:number
    name:string
    price:string
    state:boolean
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