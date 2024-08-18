export default class MockNavigationService {
  navigateToOrders = jasmine.createSpy('navigateToOrders');
  navigateToCheckout = jasmine.createSpy('navigateToCheckout');
  navigateHome = jasmine.createSpy('navigateHome');
}
