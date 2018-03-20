import { TestBed, inject } from '@angular/core/testing';

import { PiratesService } from './pirates.service';

describe('PiratesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiratesService]
    });
  });

  it('should be created', inject([PiratesService], (service: PiratesService) => {
    expect(service).toBeTruthy();
  }));
});
