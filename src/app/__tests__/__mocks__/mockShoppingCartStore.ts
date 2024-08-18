export default class MockCartStore {
  products = jasmine.createSpy('products').and.returnValue([]);
  totalAmount = jasmine.createSpy('totalAmount').and.returnValue(0);
  productsCount = jasmine.createSpy('productsCount').and.returnValue(0);
  setCart = jasmine.createSpy('setCart');
  addToCart = jasmine.createSpy('addToCart');
  removeFromCart = jasmine.createSpy('removeFromCart');
  removeOneItemFromCart = jasmine.createSpy('removeOneItemFromCart');
  clearCart = jasmine.createSpy('clearCart');

}
