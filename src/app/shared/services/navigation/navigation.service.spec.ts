import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';
import MockRouter from 'app/__tests__/__mocks__/mockRouter';


describe('Service: Navigation', () => {
  let navigationService: NavigationService
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = new MockRouter().router as jasmine.SpyObj<Router>;
    TestBed.configureTestingModule({
      providers: [NavigationService,
        { provide: Router, useValue: mockRouter }
      ]
    });
    navigationService = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(navigationService).toBeTruthy();
  });

  it('should navigate to orders', () => {
    navigationService.navigateToOrders();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should navigate to checkout with an ID', () => {
    const testId = '123';
    navigationService.navigateToCheckout(testId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/checkout', testId]);
  });

  it('should navigate to home', () => {
    navigationService.navigateHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
