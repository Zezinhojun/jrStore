export default class MockOrderService {
  addOrder = jasmine.createSpy('addOrder');
  updateOrderById = jasmine.createSpy('updateOrderById');
  filterOrdersByState = jasmine.createSpy('filterOrdersByState');
  resetOrderFilter = jasmine.createSpy('resetOrderFilter');
  deleteAllOrders = jasmine.createSpy('deleteAllOrders');
  deleteOrderById = jasmine.createSpy('deleteOrderById');
  getOrderById = jasmine.createSpy('getOrderById').and.returnValue(undefined);
  orders = jasmine.createSpy('orders').and.returnValue([]);
  totalAmount = jasmine.createSpy('totalAmount').and.returnValue(0);
  ordersCount = jasmine.createSpy('ordersCount').and.returnValue(0);
  filteredOrders = jasmine.createSpy('filteredOrders').and.returnValue([]);
}
