import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import MockCartStore from 'app/__tests__/__mocks__/mockShoppingCartStore';
import { CartStore } from '@shared/store/shopping-cart.store';
import { mockProducts } from 'app/__tests__/__mocks__/mockProducts';
import { MockGlobalErrorHandler } from 'app/__tests__/__mocks__/mockGlobalHandlerError';
import GlobalErrorHandler from '../globalErrorHandling/globalErrorHandler.service';

describe('Service: Cart', () => {
  let cartService: CartService;
  let mockCartStore: MockCartStore;
  let mockToastrService: MockToastrService;
  let mockGlobalErrorHandler: MockGlobalErrorHandler;

  beforeEach(() => {
    mockToastrService = new MockToastrService();
    mockGlobalErrorHandler = new MockGlobalErrorHandler();
    mockCartStore = new MockCartStore();

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: ToastrService, useValue: mockToastrService },
        { provide: CartStore, useValue: mockCartStore },
        { provide: GlobalErrorHandler, useValue: mockGlobalErrorHandler },
      ]
    });
    cartService = TestBed.inject(CartService);
  });

  it('should create an instance of CartService', () => {
    expect(cartService).toBeTruthy();
  });

  it('should return true if products exist in the cart', () => {
    mockCartStore.products.and.returnValue(mockProducts);
    const result = cartService.hasProduct();
    expect(result).toBeTrue();
  });

  it('should return false if there are no products in the cart', () => {
    mockCartStore.products.and.returnValue([]);
    const result = cartService.hasProduct();
    expect(result).toBeFalse();
  });

  it('should call GlobalErrorHandler.handleError and return false if CartStore.products throws an error in hasProduct', () => {
    const error = new Error('Test Error');
    mockCartStore.products.and.throwError(error);
    const result = cartService.hasProduct();
    expect(result).toBeFalse();
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

  it('should call CartStore\'s clearCart method when CartService\'s clearCart is invoked', () => {
    cartService.clearCart(false);
    expect(mockCartStore.resetCart).toHaveBeenCalledWith(false);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call GlobalErrorHandler.handleError if CartStore.resetCart throws an error in clearCart', () => {
    const error = new Error('Test Error');
    mockCartStore.resetCart.and.throwError(error);
    cartService.clearCart(false);
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

  it('should return products from CartStore when getProduct is called', () => {
    mockCartStore.products.and.returnValue(mockProducts);
    const result = cartService.getProduct();
    expect(result).toEqual(mockProducts);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call GlobalErrorHandler.handleError and return an empty array if CartStore.products throws an error in getProduct', () => {
    const error = new Error('Test Error');
    mockCartStore.products.and.throwError(error);
    const result = cartService.getProduct();
    expect(result).toEqual([]);
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

  it('should call CartStore\'s addProductToCart method when CartService\'s addToCart is invoked', () => {
    const product = mockProducts[0];
    cartService.addToCart(product);
    expect(mockCartStore.addProductToCart).toHaveBeenCalledWith(product);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call GlobalErrorHandler.handleError if CartStore.addProductToCart throws an error in addToCart', () => {
    const error = new Error('Test Error');
    mockCartStore.addProductToCart.and.throwError(error);
    const product = mockProducts[0];
    cartService.addToCart(product);
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

  it('should call CartStore\'s removeProductFromCart method when CartService\'s removeFromCart is invoked', () => {
    const productId = 1;
    cartService.removeFromCart(productId);
    expect(mockCartStore.removeProductFromCart).toHaveBeenCalledWith(productId);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call GlobalErrorHandler.handleError if CartStore.removeProductFromCart throws an error in removeFromCart', () => {
    const error = new Error('Test Error');
    mockCartStore.removeProductFromCart.and.throwError(error);
    const productId = 1;
    cartService.removeFromCart(productId);
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

  it('should call CartStore\'s decrementProductQuantity method when CartService\'s decrementProductQuantity is invoked', () => {
    const productId = 1;
    cartService.decrementProductQuantity(productId);
    expect(mockCartStore.decrementProductQuantity).toHaveBeenCalledWith(productId);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call GlobalErrorHandler.handleError if CartStore.decrementProductQuantity throws an error in decrementProductQuantity', () => {
    const error = new Error('Test Error');
    mockCartStore.decrementProductQuantity.and.throwError(error);
    const productId = 1;
    cartService.decrementProductQuantity(productId);
    expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
  });

});
