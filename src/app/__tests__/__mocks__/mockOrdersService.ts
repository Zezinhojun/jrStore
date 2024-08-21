import { IOrder } from '@shared/models/orders-interface';
import { mockOrder } from './mockOrder';
import { IProduct } from '@shared/models/products-interface';

export default class MockOrdersService {
  filterOrdersByState = jasmine.createSpy('filterOrdersByState');
  deleteAllOrders = jasmine.createSpy('deleteAllOrders');
  deleteOrderById = jasmine.createSpy('deleteOrderById');
  closeOrder = jasmine.createSpy('closeOrder');
  saveOrderAsPending = jasmine.createSpy('saveOrderAsPending');
  updateOrderById = jasmine
    .createSpy('updateOrderById')
    .and.callFake((order: IOrder, items: IProduct[], state?: string) => {
      if (order.id === '123') {
        mockOrder.state = state ?? mockOrder.state;
        mockOrder.items = items;
      }
    });
  storeOrderId = jasmine.createSpy('storeOrderId');
  retrieveOrderId = jasmine.createSpy('retrieveOrderId').and.returnValue('');
  resetOrderId = jasmine.createSpy('resetOrderId');
  continueShopping = jasmine.createSpy('continueShopping');
  goToCheckout = jasmine.createSpy('goToCheckout');
  getOrders = jasmine.createSpy('getOrders').and.returnValue([]);
  getTotalAmount = jasmine.createSpy('getTotalAmount').and.returnValue(0);
  getOrdersCount = jasmine.createSpy('getOrdersCount').and.returnValue(0);
  getFilteredOrders = jasmine
    .createSpy('getFilteredOrders')
    .and.returnValue([]);
  getOrderById = jasmine
    .createSpy('getOrderById')
    .and.callFake((id: string) => {
      return id === '123' ? mockOrder : undefined;
    });
}
