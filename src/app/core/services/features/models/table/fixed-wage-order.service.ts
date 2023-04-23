import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';
import { FixedWageEmployeeService } from './fixed-wage-employee.service';
import { OrderService } from './generic/order.service';

@Injectable({
  providedIn: 'root'
})
export class FixedWageOrderService extends OrderService<FixedWageOrder, FixedWageEmployee> {
  constructor(
    employeeService: FixedWageEmployeeService,
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(employeeService, http, snackbarCaller, hubService, 'fixedwageorder');
  }
}
