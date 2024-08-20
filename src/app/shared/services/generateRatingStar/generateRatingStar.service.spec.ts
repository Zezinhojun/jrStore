/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GenerateRatingStarService } from './generateRatingStar.service';

describe('Service: GenerateRatingStar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRatingStarService]
    });
  });

  it('should ...', inject([GenerateRatingStarService], (service: GenerateRatingStarService) => {
    expect(service).toBeTruthy();
  }));
});
