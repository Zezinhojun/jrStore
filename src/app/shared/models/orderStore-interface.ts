import { IOrder } from "./orders-interface";

export interface IOrderStore {
  orders: IOrder[]
  totalAmount: number;
  ordersCount: number;
  filteredOrders: IOrder[],
}
