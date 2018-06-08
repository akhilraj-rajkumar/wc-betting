import { TestBed, inject } from '@angular/core/testing';

import { FutureBetsService } from './future-bets.service';

describe('FutureBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutureBetsService]
    });
  });

  it('should be created', inject([FutureBetsService], (service: FutureBetsService) => {
    expect(service).toBeTruthy();
  }));
});
