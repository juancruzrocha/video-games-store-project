
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

