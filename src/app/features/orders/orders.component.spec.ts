import { ComponentFixture, TestBed } from '@angular/core/testing';

import OrdersComponent from './orders.component';
import { OrdersService } from './services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from '@shared/utils/order-status';
import MockOrdersService from 'app/__tests__/__mocks__/mockOrdersService';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';


describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let mockOrdersService: MockOrdersService;
  let mockToastrService: MockToastrService;

  beforeEach(async () => {
    mockOrdersService = new MockOrdersService();
    mockToastrService = new MockToastrService();

    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call OrdersService.filterOrdersByState with the correct state', () => {
    const state = Status.CLOSED;
    component.applyFilter(state);
    expect(mockOrdersService.filterOrdersByState).toHaveBeenCalledWith(state);
  });
  it('should call OrdersService.clearFilter when clearFilter is invoked', () => {
    component.clearFilter();
    expect(mockOrdersService.clearFilter).toHaveBeenCalled();
  });

  it('should call OrdersService.removeAllOrders when clearOrders is invoked', () => {
    component.clearOrders();
    expect(mockOrdersService.removeAllOrders).toHaveBeenCalled();
  });

  it('should call OrdersService.closeOrder when onCloseOrder is invoked', () => {
    component.onCloseOrder();
    expect(mockOrdersService.closeOrder).toHaveBeenCalled();
  });

  it('should call OrdersService.removeOrderById with the correct order id', () => {
    const id = '123';
    component.removeOneOrder(id);
    expect(mockOrdersService.removeOrderById).toHaveBeenCalledWith(id);
  });

  it('should call OrdersService.storeOrderId and OrdersService.goToCheckout with the correct order id', () => {
    const id = '123';
    component.onGoToCheckout(id);
    expect(mockOrdersService.storeOrderId).toHaveBeenCalledWith(id);
    expect(mockOrdersService.goToCheckout).toHaveBeenCalledWith(id);
  });
});
