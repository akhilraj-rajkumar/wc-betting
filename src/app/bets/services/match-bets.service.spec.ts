import { TestBed, inject } from '@angular/core/testing';

import { MatchBetsService } from './match-bets.service';

describe('MatchBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchBetsService]
    });
  });

  it('should be created', inject([MatchBetsService], (service: MatchBetsService) => {
    expect(service).toBeTruthy();
  }));
});
