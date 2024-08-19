import { ComponentFixture, TestBed } from '@angular/core/testing';

import OrdersComponent from './orders.component';
import { ToastrService } from 'ngx-toastr';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';


describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let mockToastrService: MockToastrService;

  beforeEach(async () => {
    mockToastrService = new MockToastrService();

    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
      providers: [
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
});
