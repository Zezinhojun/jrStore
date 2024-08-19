import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import MockCartStore from 'app/__tests__/__mocks__/mockShoppingCartStore';
import { CartStore } from '@shared/store/shopping-cart.store';
import { mockProducts } from 'app/__tests__/__mocks__/mockProducts';

describe('Service: Cart', () => {
  let cartService: CartService;
  let mockCartStore: MockCartStore;
  let mockToastrService: MockToastrService;

  beforeEach(() => {
    mockToastrService = new MockToastrService();
    mockCartStore = new MockCartStore();

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: ToastrService, useValue: mockToastrService },
        { provide: CartStore, useValue: mockCartStore }
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

  it('should call CartStore\'s clearCart method when CartService\'s clearCart is invoked', () => {
    mockCartStore.products.and.returnValue([]);
    cartService.clearCart(false);
    expect(mockCartStore.clearCart).toHaveBeenCalledWith(false);
  });

  it('should return products from CartStore when getProduct is called', () => {
    mockCartStore.products.and.returnValue(mockProducts);
    const result = cartService.getProduct();
    expect(result).toEqual(mockProducts);
  });

});
