import { TestBed, inject } from '@angular/core/testing';

import { LeadersService } from './leaders.service';

describe('LeadersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeadersService]
    });
  });

  it('should be created', inject([LeadersService], (service: LeadersService) => {
    expect(service).toBeTruthy();
  }));
});
