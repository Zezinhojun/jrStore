export default class MockCartService {
  hasProduct = jasmine.createSpy('hasProduct').and.returnValue(false);
  getProduct = jasmine.createSpy('getProduct').and.returnValue({});
  clearCart = jasmine.createSpy('clearCart');
}
