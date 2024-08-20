import MockNavigationService from "app/__tests__/__mocks__/mockNavigationService";
import { CheckoutService } from "./checkout.service"
import MockOrdersService from "app/__tests__/__mocks__/mockOrdersService";
import MockCartService from "app/__tests__/__mocks__/mockCartService";
import { TestBed } from "@angular/core/testing";
import { NavigationService } from "@shared/services/navigation/navigation.service";
import { OrdersService } from "app/features/orders/services/orders.service";
import { CartService } from "@shared/services/cart/cart.service";
import { ActivatedRoute } from "@angular/router";
import { mockOrder } from "app/__tests__/__mocks__/mockOrder";
import { mockProducts } from "app/__tests__/__mocks__/mockProducts";
import { Status } from "@shared/utils/order-status";
import MockActivatedRoute from "app/__tests__/__mocks__/mockActivatedRoute";

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let mockNavigationService: MockNavigationService;
  let mockOrdersService: MockOrdersService;
  let mockCartService: MockCartService;
  let mockActivatedRoute: MockActivatedRoute;
  const orderId = "123"
  const productId = 1;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute();
    mockNavigationService = new MockNavigationService();
    mockOrdersService = new MockOrdersService();
    mockCartService = new MockCartService();
    TestBed.configureTestingModule({
      providers: [
        CheckoutService,
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: OrdersService, useValue: mockOrdersService },
        { provide: CartService, useValue: mockCartService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    checkoutService = TestBed.inject(CheckoutService);
  })

  it('should create an instance of CheckoutService', () => {
    expect(checkoutService).toBeTruthy();
  });

  it('should initialize order as null initially', () => {
    expect(checkoutService.getOrder()).toBeNull();
  });

  it('should call updateOrderById with the correct parameters based on the provided state', () => {
    const newState = 'closed';
    const order = mockOrder;
    mockOrdersService.getOrderById.and.returnValue(order);
    checkoutService.updateOrder(orderId, newState);

    expect(mockOrdersService.updateOrderById).toHaveBeenCalledWith(order, newState);
    expect(mockOrdersService.updateOrderById).toHaveBeenCalledTimes(1);

    mockOrdersService.updateOrderById.calls.reset();
    mockOrdersService.getOrderById.and.returnValue(order);
    checkoutService.updateOrder(orderId);

    expect(mockOrdersService.updateOrderById).toHaveBeenCalledWith(order, undefined);
    expect(mockOrdersService.updateOrderById).toHaveBeenCalledTimes(1);

    mockOrdersService.updateOrderById.calls.reset();
    mockOrdersService.getOrderById.and.returnValue(undefined);
    checkoutService.updateOrder(orderId);

    expect(mockOrdersService.updateOrderById).not.toHaveBeenCalled();
  });

  it('should populate the cart from order correctly', () => {
    const order = { ...mockOrder, items: mockProducts };
    mockOrdersService.getOrderById.and.returnValue(order);
    checkoutService.populateCartFromOrder(orderId);

    expect(mockOrdersService.getOrderById).toHaveBeenCalledWith(orderId);
    expect(mockCartService.clearCart).toHaveBeenCalledWith(false);
    mockProducts.forEach(item => {
      expect(mockCartService.addToCart).toHaveBeenCalledWith(item);
    });
    expect(mockCartService.addToCart).toHaveBeenCalledTimes(mockProducts.length);
  });

  it('should not modify the cart if order does not exist', () => {
    mockOrdersService.getOrderById.and.returnValue(undefined);
    checkoutService.populateCartFromOrder(orderId);
    expect(mockOrdersService.getOrderById).toHaveBeenCalledWith(orderId);
    expect(mockCartService.clearCart).not.toHaveBeenCalled();
    expect(mockCartService.addToCart).not.toHaveBeenCalled();
  });

  it('should handle saving an order as pending when an order ID is present', () => {
    spyOn(checkoutService, 'retrieveCurrentOrderId').and.returnValue(orderId);
    spyOn(checkoutService, 'resetCurrentOrderId');
    spyOn(checkoutService, 'updateOrder');

    checkoutService.saveOrderAsPending();

    expect(checkoutService.retrieveCurrentOrderId).toHaveBeenCalled();
    expect(checkoutService.updateOrder).toHaveBeenCalledWith(orderId);
    expect(checkoutService.resetCurrentOrderId).toHaveBeenCalled();
    expect(mockCartService.clearCart).toHaveBeenCalledWith(false);
    expect(mockOrdersService.saveOrderAsPending).not.toHaveBeenCalled();
    expect(mockNavigationService.navigateToOrders).not.toHaveBeenCalled();
  });

  it('should finalize the order when an order ID is present', () => {
    spyOn(checkoutService, 'retrieveCurrentOrderId').and.returnValue(orderId);
    spyOn(checkoutService, 'resetCurrentOrderId');
    spyOn(checkoutService, 'updateOrder');
    spyOn(checkoutService, 'completeOrderProcessing');

    checkoutService.finalizeOrder();

    expect(checkoutService.retrieveCurrentOrderId).toHaveBeenCalled();
    expect(checkoutService.updateOrder).toHaveBeenCalledWith(orderId, Status.CLOSED);
    expect(checkoutService.resetCurrentOrderId).toHaveBeenCalled();
    expect(checkoutService.completeOrderProcessing).not.toHaveBeenCalled();
    expect(mockCartService.clearCart).toHaveBeenCalledWith(false);
  });

  it('should navigate to home page', () => {
    checkoutService.navigateToHomePage();
    expect(mockNavigationService.navigateHome).toHaveBeenCalled();
  });

  it('should complete order processing', () => {
    checkoutService.completeOrderProcessing();
    expect(mockOrdersService.closeOrder).toHaveBeenCalled();
  });

  it('should remove product from cart', () => {
    checkoutService.removeProductFromCart(productId);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(productId);
  });

  it('should decrement product quantity', () => {
    checkoutService.decrementProductQuantity(productId);
    expect(mockCartService.decrementProductQuantity).toHaveBeenCalledWith(productId);
  });

  it('should remove order if cart is empty', () => {
    mockOrdersService.getOrderById.and.returnValue(mockOrder);
    checkoutService.removeOrderIfCartIsEmpty(orderId);
    expect(mockOrdersService.updateOrderById).toHaveBeenCalledWith(mockOrder);
  });

  it('should not remove order if cart is not empty', () => {
    mockOrdersService.getOrderById.and.returnValue(undefined);
    checkoutService.removeOrderIfCartIsEmpty(orderId);
    expect(mockOrdersService.updateOrderById).not.toHaveBeenCalled();
  });

  it('should delete order by ID', () => {
    checkoutService.deleteOrderById(orderId);
    expect(mockOrdersService.deleteOrderById).toHaveBeenCalledWith(orderId);
  });

  it('should retrieve the current order ID', () => {
    mockOrdersService.retrieveOrderId.and.returnValue(orderId);
    const result = checkoutService.retrieveCurrentOrderId();
    expect(mockOrdersService.retrieveOrderId).toHaveBeenCalled();
    expect(result).toBe(orderId);
  });

  it('should reset the current order ID', () => {
    checkoutService.resetCurrentOrderId();
    expect(mockOrdersService.resetOrderId).toHaveBeenCalled();
  });

})
