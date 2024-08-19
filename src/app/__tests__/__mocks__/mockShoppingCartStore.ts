export default class MockCartStore {
  products = jasmine.createSpy('products').and.returnValue([]);
  totalAmount = jasmine.createSpy('totalAmount').and.returnValue(0);
  productsCount = jasmine.createSpy('productsCount').and.returnValue(0);
  setCart = jasmine.createSpy('updateCart');
  addProductToCart = jasmine.createSpy('addProductToCart');
  removeProductFromCart = jasmine.createSpy('removeProductFromCart');
  decrementProductQuantity = jasmine.createSpy('decrementProductQuantity');
  resetCart = jasmine.createSpy('resetCart');

}
