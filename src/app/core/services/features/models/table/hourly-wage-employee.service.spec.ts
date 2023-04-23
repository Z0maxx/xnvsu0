import { TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeService } from './hourly-wage-employee.service';

describe('HourlyWageEmployeeService', () => {
  let service: HourlyWageEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyWageEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
