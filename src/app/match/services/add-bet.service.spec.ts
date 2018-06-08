import { TestBed, inject } from '@angular/core/testing';

import { AddBetService } from './add-bet.service';

describe('AddBetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddBetService]
    });
  });

  it('should be created', inject([AddBetService], (service: AddBetService) => {
    expect(service).toBeTruthy();
  }));
});
