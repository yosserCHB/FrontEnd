import { TestBed } from '@angular/core/testing';

import { ParkingLotsService } from './parking-lots.service';

describe('ParkingLotsService', () => {
  let service: ParkingLotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingLotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
