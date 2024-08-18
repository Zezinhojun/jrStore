/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import GlobalErrorHandlingService from './globalErrorHandler.service';

describe('Service: GlobalErrorHandling', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandlingService]
    });
  });

  it('should ...', inject([GlobalErrorHandlingService], (service: GlobalErrorHandlingService) => {
    expect(service).toBeTruthy();
  }));
});
