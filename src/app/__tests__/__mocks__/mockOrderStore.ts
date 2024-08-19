export default class MockOrderStore {
  updateOrderById = jasmine.createSpy('updateOrderById');
  addOrder = jasmine.createSpy('addOrder');
  filterOrdersByState = jasmine.createSpy('filterOrdersByState');
  resetOrderFilter = jasmine.createSpy('resetOrderFilter');
  deleteAllOrders = jasmine.createSpy('deleteAllOrders');
  deleteOrderById = jasmine.createSpy('deleteOrderById');
  getOrderById = jasmine.createSpy('getOrderById').and.returnValue(undefined);
}
