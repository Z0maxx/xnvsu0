import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';
import { EmployeeService } from './generic/employee.service';

@Injectable({
  providedIn: 'root'
})
export class FixedWageEmployeeService extends EmployeeService<FixedWageEmployee> {
  constructor(
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(http, snackbarCaller, hubService, 'fixedwageemployee');
  }
}
