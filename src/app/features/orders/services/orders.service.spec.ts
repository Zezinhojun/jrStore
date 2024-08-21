import { TestBed } from '@angular/core/testing';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import { OrderService } from '@shared/services/order/order.service';
import { Status } from '@shared/utils/order-status';
import MockCartService from 'app/__tests__/__mocks__/mockCartService';
import MockNavigationService from 'app/__tests__/__mocks__/mockNavigationService';
import { mockOrder } from 'app/__tests__/__mocks__/mockOrder';
import MockOrderService from 'app/__tests__/__mocks__/mockOrderService';
import { mockProducts } from 'app/__tests__/__mocks__/mockProducts';

import { CartService } from '../../../shared/services/cart/cart.service';
import { OrdersService } from './orders.service';

describe('OrderService', () => {
  let ordersService: OrdersService;
  let mockOrderService: MockOrderService;
  let mockCartService: MockCartService;
  let mockNavigationService: MockNavigationService;

  beforeEach(async () => {
    mockOrderService = new MockOrderService();
    mockCartService = new MockCartService();
    mockNavigationService = new MockNavigationService();

    await TestBed.configureTestingModule({
      providers: [
        OrdersService,
        { provide: CartService, useValue: mockCartService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: NavigationService, useValue: mockNavigationService },
      ],
    }).compileComponents();

    ordersService = TestBed.inject(OrdersService);
  });

  it('should create an instance of OrdersService', () => {
    expect(ordersService).toBeTruthy();
  });

  it('should clear all filters in the order store', () => {
    ordersService.resetOrderFilter();
    expect(mockOrderService.resetOrderFilter).toHaveBeenCalled();
  });

  it('should find and return order by ID', () => {
    const orderId = '123';
    mockOrderService.getOrderById.and.returnValue(mockOrder);
    const result = ordersService.getOrderById(orderId);
    expect(result).toEqual(mockOrder);
    expect(mockOrderService.getOrderById).toHaveBeenCalledWith(orderId);
  });

  it('should remove all orders', () => {
    ordersService.deleteAllOrders();
    expect(mockOrderService.deleteAllOrders).toHaveBeenCalled();
  });

  it('should remove order by id', () => {
    const orderId = '123';
    ordersService.deleteOrderById(orderId);
    expect(mockOrderService.deleteOrderById).toHaveBeenCalledWith(orderId);
  });

  it('should close order when cart has products', () => {
    mockCartService.hasProduct.and.returnValue(true);
    mockCartService.getProduct.and.returnValue(mockProducts);
    ordersService.closeOrder();
    expect(mockOrderService.addOrder).toHaveBeenCalledWith(
      mockProducts,
      Status.CLOSED,
    );
    expect(mockCartService.clearCart).toHaveBeenCalled();
    expect(mockNavigationService.navigateToOrders).toHaveBeenCalled();
  });

  it('should save order as pending when cart has products', () => {
    mockCartService.hasProduct.and.returnValue(true);
    mockCartService.getProduct.and.returnValue(mockProducts);
    ordersService.saveOrderAsPending();
    expect(mockOrderService.addOrder).toHaveBeenCalledWith(
      mockProducts,
      Status.PENDING,
    );
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });

  it('should update order when cart has products', () => {
    mockCartService.hasProduct.and.returnValue(true);
    mockCartService.getProduct.and.returnValue(mockProducts);
    const state = Status.CLOSED;
    ordersService.updateOrderById(mockOrder, state);
    expect(mockOrderService.updateOrderById).toHaveBeenCalledWith(
      mockOrder,
      mockProducts,
      state,
    );
    expect(mockCartService.clearCart).toHaveBeenCalled();
    expect(mockNavigationService.navigateToOrders).toHaveBeenCalled();
  });

  it('should store order ID', () => {
    const orderId = '123';
    ordersService.storeOrderId(orderId);
    expect(ordersService.retrieveOrderId()).toBe(orderId);
  });

  it('should reset order ID', () => {
    ordersService.resetOrderId();
    expect(ordersService.retrieveOrderId()).toBe('');
  });

  it('should continue shopping', () => {
    ordersService.continueShopping();
    expect(mockNavigationService.navigateHome).toHaveBeenCalled();
  });

  it('should go to checkout with ID', () => {
    const orderId = '123';
    ordersService.goToCheckout(orderId);
    expect(mockNavigationService.navigateToCheckout).toHaveBeenCalledWith(
      orderId,
    );
  });
});
