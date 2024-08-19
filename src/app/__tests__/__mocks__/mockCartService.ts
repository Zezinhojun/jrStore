export default class MockCartService {
  products = jasmine.createSpy('products').and.returnValue([]);
  totalAmount = jasmine.createSpy('totalAmount').and.returnValue(0);
  productsCount = jasmine.createSpy('productsCount').and.returnValue(0);
  hasProduct = jasmine.createSpy('hasProduct').and.returnValue(false);
  getProduct = jasmine.createSpy('getProduct').and.returnValue([]);
  clearCart = jasmine.createSpy('clearCart');
  addToCart = jasmine.createSpy('addToCart');
  removeFromCart = jasmine.createSpy('removeFromCart');
  decrementProductQuantity = jasmine.createSpy('decrementProductQuantity');
}
