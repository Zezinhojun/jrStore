import { TestBed } from '@angular/core/testing';
import { GenerateRatingStarService } from './generateRatingStar.service';

describe('Service: GenerateRatingStar', () => {
  let generateRatingStar: GenerateRatingStarService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRatingStarService]
    });
    generateRatingStar = TestBed.inject(GenerateRatingStarService);
  });

  it('should create an instance of GenerateRatingStarService', () => {
    expect(generateRatingStar).toBeTruthy();
  });
});
