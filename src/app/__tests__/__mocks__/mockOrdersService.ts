export default class MockOrdersService {
  filterOrdersByState = jasmine.createSpy('filterOrdersByState');
  clearFilter = jasmine.createSpy('clearFilter');
  removeAllOrders = jasmine.createSpy('removeAllOrders');
  closeOrder = jasmine.createSpy('closeOrder');
  continueShopping = jasmine.createSpy('continueShopping');
  removeOrderById = jasmine.createSpy('removeOrderById');
  storeOrderId = jasmine.createSpy('storeOrderId');
  goToCheckout = jasmine.createSpy('goToCheckout');
}
