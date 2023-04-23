import { TestBed } from '@angular/core/testing';

import { HourlyWageOrderService } from './hourly-wage-order.service';

describe('HourlyWageOrderService', () => {
  let service: HourlyWageOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyWageOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
