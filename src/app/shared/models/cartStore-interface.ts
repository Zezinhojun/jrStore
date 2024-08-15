import { IProduct } from "./products.interface";

export interface ICartStore {
    products: IProduct[]
    totalAmount: number;
    productsCount: number;
  }