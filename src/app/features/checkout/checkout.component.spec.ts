import { ComponentFixture, TestBed } from '@angular/core/testing';

import CheckoutComponent from './checkout.component';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import MockActivatedRoute from 'app/__tests__/__mocks__/MockActivatedRoute';
import { ActivatedRoute } from '@angular/router';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockToastrService: MockToastrService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockToastrService = new MockToastrService();
    mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
