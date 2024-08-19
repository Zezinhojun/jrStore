import { TestBed } from "@angular/core/testing"
import { OrdersService } from "./orders.service"
import MockNavigationService from "app/__tests__/__mocks__/mockNavigationService";
import MockCartService from "app/__tests__/__mocks__/mockCartService";
import MockOrderStore from "app/__tests__/__mocks__/mockOrderStore";
import { OrderStore } from "@shared/store/order.store";
import { CartService } from "../../../shared/services/cart/cart.service";
import { NavigationService } from "@shared/services/navigation/navigation.service";
import { Status } from "@shared/utils/order-status";
import { mockOrder } from "app/__tests__/__mocks__/mockOrder";
import { mockProducts } from "app/__tests__/__mocks__/mockProducts";
import { MockGlobalErrorHandler } from "app/__tests__/__mocks__/mockGlobalHandlerError";
import GlobalErrorHandler from "@shared/services/globalErrorHandling/globalErrorHandler.service";

describe('OrderService', () => {
  let ordersService: OrdersService;
  let mockOrderStore: MockOrderStore;
  let mockCartService: MockCartService;
  let mockNavigationService: MockNavigationService;
  let mockGlobalErrorHandler: MockGlobalErrorHandler;

  beforeEach(async () => {

    mockOrderStore = new MockOrderStore();
    mockCartService = new MockCartService();
    mockNavigationService = new MockNavigationService();
    mockGlobalErrorHandler = new MockGlobalErrorHandler();

    await TestBed.configureTestingModule({
      providers: [OrdersService,
        { provide: OrderStore, useValue: mockOrderStore },
        { provide: CartService, useValue: mockCartService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: GlobalErrorHandler, useValue: mockGlobalErrorHandler }
      ],
    }).compileComponents()

    ordersService = TestBed.inject(OrdersService);
  })

  describe('Methods Testing', () => {
    it('should clear all filters in the order store', () => {
      ordersService.clearFilter();
      expect(mockOrderStore.clearFilter).toHaveBeenCalled();
    });

    it('should find and return order by ID', () => {
      const orderId = '123';
      mockOrderStore.findOrderById.and.returnValue(mockOrder);
      const result = ordersService.findOrderById(orderId);
      expect(result).toEqual(mockOrder);
      expect(mockOrderStore.findOrderById).toHaveBeenCalledWith(orderId);
    });

    it('should handle error when finding order by ID', () => {
      const orderId = '123';
      const error = new Error('Error finding order');
      mockOrderStore.findOrderById.and.throwError(error);
      ordersService.findOrderById(orderId);
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(error);
    });

    it('should remove all orders', () => {
      ordersService.removeAllOrders();
      expect(mockOrderStore.removeAllOrders).toHaveBeenCalled();
    });

    it('should handle error when removing all orders', () => {
      mockOrderStore.removeAllOrders.and.throwError('Error removing orders');
      ordersService.removeAllOrders();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should remove order by id', () => {
      const orderId = '123';
      ordersService.removeOrderById(orderId);
      expect(mockOrderStore.removeOrderById).toHaveBeenCalledWith(orderId);
    });

    it('should handle error when removing order by ID', () => {
      const orderId = '123';
      mockOrderStore.removeOrderById.and.throwError('Error removing order');
      ordersService.removeOrderById(orderId);
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });
  });

  describe('Conditional Behavior Testing', () => {
    it('should close order when cart has products', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      ordersService.closeOrder();
      expect(mockOrderStore.addOrder).toHaveBeenCalledWith(mockProducts, Status.CLOSED);
      expect(mockCartService.clearCart).toHaveBeenCalled();
      expect(mockNavigationService.navigateToOrders).toHaveBeenCalled();
    });

    it('should handle error when closing order', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      mockOrderStore.addOrder.and.throwError('Error adding order');
      ordersService.closeOrder();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should not close order if the cart is empty', () => {
      const state = 'pending';
      ordersService.filterOrdersByState(state);
      expect(mockOrderStore.filterOrdersByState).toHaveBeenCalledWith(state);
    });

    it('should not close order when cart is empty', () => {
      mockCartService.hasProduct.and.returnValue(false);
      ordersService.closeOrder();
      expect(mockOrderStore.addOrder).not.toHaveBeenCalled();
      expect(mockCartService.clearCart).not.toHaveBeenCalled();
      expect(mockNavigationService.navigateToOrders).not.toHaveBeenCalled();
    });

    it('should save order as pending when cart has products', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      ordersService.saveOrderAsPending();
      expect(mockOrderStore.addOrder).toHaveBeenCalledWith(mockProducts, Status.PENDING);
      expect(mockCartService.clearCart).toHaveBeenCalled();
    });

    it('should handle error when saving order as pending', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      mockOrderStore.addOrder.and.throwError('Error adding order');
      ordersService.saveOrderAsPending();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should update order when cart has products', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      const state = Status.CLOSED;
      ordersService.updateOrder(mockOrder, state);
      expect(mockOrderStore.updateOrder).toHaveBeenCalledWith(mockOrder, mockProducts, state);
      expect(mockCartService.clearCart).toHaveBeenCalled();
      expect(mockNavigationService.navigateToOrders).toHaveBeenCalled();
    });

    it('should handle error when updating order', () => {
      mockCartService.hasProduct.and.returnValue(true);
      mockCartService.getProduct.and.returnValue(mockProducts);
      mockOrderStore.updateOrder.and.throwError('Error updating order');
      ordersService.updateOrder(mockOrder, Status.CLOSED);
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });
  });

  describe('Order ID Management', () => {
    it('should store order ID', () => {
      const orderId = '123';
      ordersService.storeOrderId(orderId);
      expect(ordersService.retrieveOrderId()).toBe(orderId);
    });

    it('should handle error when storing order ID', () => {
      spyOn(ordersService.orderId, 'set').and.throwError('Error storing order ID');
      ordersService.storeOrderId('123');
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });

    it('should reset order ID', () => {
      ordersService.resetOrderId();
      expect(ordersService.retrieveOrderId()).toBe('');
    });

    it('should handle error when resetting order ID', () => {
      spyOn(ordersService.orderId, 'set').and.throwError('Error resetting order ID');
      ordersService.resetOrderId();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
    });
  });
  describe('Navigation Testing', () => {

    beforeEach(() => {
      mockNavigationService.navigateHome.and.returnValue(Promise.resolve());
      mockNavigationService.navigateToCheckout.and.returnValue(Promise.resolve());
    });

    it('should continue shopping', () => {
      ordersService.continueShopping();
      expect(mockNavigationService.navigateHome).toHaveBeenCalled();
    });

    it('should handle error when continuing shopping', () => {
      mockNavigationService.navigateHome.and.throwError('Error navigating home');
      ordersService.continueShopping();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(jasmine.any(Error));
    });

    it('should go to checkout with ID', () => {
      const orderId = '123';
      ordersService.goToCheckout(orderId);
      expect(mockNavigationService.navigateToCheckout).toHaveBeenCalledWith(orderId);
    });

    it('should handle error when going to checkout', () => {
      mockNavigationService.navigateToCheckout.and.throwError('Error navigating to checkout');
      ordersService.goToCheckout('123');
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalled();
      expect(mockGlobalErrorHandler.handleError).toHaveBeenCalledWith(jasmine.any(Error));
    });

  });

})
