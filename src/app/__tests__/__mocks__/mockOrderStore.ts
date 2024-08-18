export default class MockOrderStore {
  clearFilter = jasmine.createSpy('clearFilter');
  findOrderById = jasmine.createSpy('findOrderById').and.returnValue(undefined); // Pode ser ajustado conforme necessário
  filterOrdersByState = jasmine.createSpy('filterOrdersByState');
  removeAllOrders = jasmine.createSpy('removeAllOrders');
  removeOrderById = jasmine.createSpy('removeOrderById');
  addOrder = jasmine.createSpy('addOrder');
  updateOrder = jasmine.createSpy('updateOrder');
}
