import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';
import { EmployeeService } from './generic/employee.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyWageEmployeeService extends EmployeeService<HourlyWageEmployee> {
  constructor(
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(http, snackbarCaller, hubService, 'hourlywageemployee');
  }
}
