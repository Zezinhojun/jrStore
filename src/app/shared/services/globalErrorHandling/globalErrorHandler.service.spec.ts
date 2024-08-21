import { TestBed } from '@angular/core/testing';
import GlobalErrorHandlingService from './globalErrorHandler.service';

describe('Service: GlobalErrorHandling', () => {
  let globalErrorHandler: GlobalErrorHandlingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandlingService],
    });
    globalErrorHandler = TestBed.inject(GlobalErrorHandlingService);
  });

  it('should create an instance of GlobalErrorHandlerService', () => {
    expect(globalErrorHandler).toBeTruthy();
  });
});
