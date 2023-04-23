import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';
import { HourlyWageEmployeeService } from './hourly-wage-employee.service';
import { OrderService } from './generic/order.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyWageOrderService extends OrderService<HourlyWageOrder, HourlyWageEmployee> {
  constructor(
    employeeService: HourlyWageEmployeeService,
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(employeeService, http, snackbarCaller, hubService, 'hourlywageorder');
  }
}
