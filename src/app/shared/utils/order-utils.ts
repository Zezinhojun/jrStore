import { IOrder } from '@shared/models/orders-interface';

export const calculateTotalAmountForOrder = (order: IOrder): number => {
  return parseFloat(order.items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
}

export const calculateOrderCountForOrder = (order: IOrder): number => {
  return order.items.reduce((acc, item) => acc + item.qty, 0);
}

export const calculateTotalAmount = (orders: IOrder[]): number => {
  return orders.reduce((acc, order) => acc + order.totalAmount, 0);
}

export const calculateTotalOrderCount = (orders: IOrder[]): number => {
  return orders.reduce((acc, order) => acc + order.ordersCount, 0);
}
