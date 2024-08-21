import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import MockOrderStore from 'app/__tests__/__mocks__/mockOrderStore';
import { MockGlobalErrorHandler } from 'app/__tests__/__mocks__/mockGlobalHandlerError';
import { mockProducts } from 'app/__tests__/__mocks__/mockProducts';
import { OrderStore } from '@shared/store/order.store';
import { mockOrder } from 'app/__tests__/__mocks__/mockOrder';

describe('Service: Order', () => {
  let orderService: OrderService;
  let mockOrderStore: MockOrderStore;
  let mockToastrService: MockToastrService;
  let mockGlobalErrorHandler: MockGlobalErrorHandler;

  beforeEach(() => {
    mockOrderStore = new MockOrderStore();
    mockGlobalErrorHandler = new MockGlobalErrorHandler();
    mockToastrService = new MockToastrService();
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: OrderStore, useValue: mockOrderStore },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MockGlobalErrorHandler, useValue: mockGlobalErrorHandler },
      ],
    });
    orderService = TestBed.inject(OrderService);
  });
  it('should create an instance of OrderService', () => {
    expect(orderService).toBeTruthy();
  });

  it('should call OrderStore.addOrder and handle errors correctly', () => {
    const state = 'OPEN';
    orderService.addOrder(mockProducts, state);
    expect(mockOrderStore.addOrder).toHaveBeenCalled();
    expect(mockOrderStore.addOrder).toHaveBeenCalledWith(
      mockProducts,
      state,
      undefined,
    );
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call OrderStore.resetOrderFilter and handle errors correctly', () => {
    orderService.resetOrderFilter();
    expect(mockOrderStore.resetOrderFilter).toHaveBeenCalled();
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call OrderStore.deleteAllOrders and handle errors correctly', () => {
    orderService.deleteAllOrders();
    expect(mockOrderStore.deleteAllOrders).toHaveBeenCalled();
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call OrderStore.deleteOrderById and handle errors correctly', () => {
    const id = '123';
    orderService.deleteOrderById(id);
    expect(mockOrderStore.deleteOrderById).toHaveBeenCalled();
    expect(mockOrderStore.deleteOrderById).toHaveBeenCalledWith(id);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });

  it('should call OrderStore.getOrderById and return the correct value', () => {
    const id = '123';
    mockOrderStore.getOrderById.and.returnValue(mockOrder);
    const result = orderService.getOrderById(id);
    expect(mockOrderStore.getOrderById).toHaveBeenCalled();
    expect(mockOrderStore.getOrderById).toHaveBeenCalledWith(id);
    expect(result).toBe(mockOrder);
    expect(mockGlobalErrorHandler.handleError).not.toHaveBeenCalled();
  });
});
