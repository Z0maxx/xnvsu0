import { TestBed } from '@angular/core/testing';

import { FixedWageOrderService } from './fixed-wage-order.service';

describe('FixedWageOrderService', () => {
  let service: FixedWageOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedWageOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
