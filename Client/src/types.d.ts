export interface Game {
  background_image: string;
  description: string;
  genres: string[];
  id: number;
  images: string[];
  name: string;
  platforms: string[];
  playtime: number;
  price: string;
  rating: string;
  released: string;
  state: boolean
  stores: string[];
}
export interface CardPropsType {
  background_image:string
  genres:string[]
  id:number
  name:string
  price:string
  state:boolean
}


export interface CardProps {
  id: string | number;
  name: string;
  background_image: string;
  platforms: string[];
  price: string | number;
}

export interface CardProps2 extends CardProps {
  description: string;
  image: string[];
}

export interface Comment {
    id: number;
    userId: string;
    productId: number;
    comment: string;
    date: string;
    image: string;
    stars: number;
  }

export interface User {
    email: string,
		admin: boolean,
    name: string,
		blocked: boolean,
		secret: string,
    image: string
  }

export interface Friend {
  emailUser: string,
  emailFriend: string,
  response: string
}

interface DiscountState {
  discount: number,
  genre: string
}

export interface ListSales {
  id:number,
  Product:Name,
  priceUnitNet: string,
  UserEmail: string
}



export interface ProductsTypeUser {
  email: string;
}

export interface ProductsTypeProduct {
  background_image: string;
  description: string;
  id: number;
  name: string;
  price: string;
  released: string;
}

export interface ProductsType {
  Product: ProductsTypeProduct;
  ProductId: number;
  User: ProductsTypeUser;
  UserEmail: string;
  dateTransaction: string;
  giftGame: boolean;
  id: number;
  numberPayment: string;
  priceUnit: string;
  priceUnitNet: string;
  serialOfGame: string;
  specialDiscount: string;
  state: boolean;
  userEmailGift: string;
}
export interface PropsCardLibrary {
  background_image: string;
  id: number;
  name: string;
  price: string;
  released: string;
}

