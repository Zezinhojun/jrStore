import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';


describe('Service: Navigation', () => {

  let navigationService: NavigationService
  let router: jasmine.SpyObj<Router>
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [NavigationService,
        { provide: Router, useValue: spy }
      ]
    });
    navigationService = TestBed.inject(NavigationService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(navigationService).toBeTruthy();
  });

  it('should navigate to orders', () => {
    navigationService.navigateToOrders();
    expect(router.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should navigate to checkout with an ID', () => {
    const testId = '123';
    navigationService.navigateToCheckout(testId);
    expect(router.navigate).toHaveBeenCalledWith(['/checkout', testId]);
  });

  it('should navigate to home', () => {
    navigationService.navigateHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
