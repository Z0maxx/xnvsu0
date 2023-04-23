import { TestBed } from '@angular/core/testing';

import { FixedWageEmployeeService } from './fixed-wage-employee.service';

describe('FixedWageEmployeeService', () => {
  let service: FixedWageEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedWageEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
