import { TestBed } from '@angular/core/testing';

import { SnackbarCallerService } from './snackbar-caller.service';

describe('SnackbarCallerService', () => {
  let service: SnackbarCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
