import { IProduct } from "./products-interface";

export interface IOrder {
  id: string;
  state: string
  items: IProduct[];
  totalAmount: number;
  ordersCount: number;
}
