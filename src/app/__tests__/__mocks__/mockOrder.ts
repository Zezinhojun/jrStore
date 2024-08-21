import { IOrder } from '@shared/models/orders-interface';
import { mockProducts } from './mockProducts';

export const mockOrder: IOrder = {
  id: '123',
  state: 'pending',
  items: mockProducts,
  totalAmount: 10,
  ordersCount: 1,
};
