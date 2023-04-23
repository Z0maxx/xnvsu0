import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { EmployeeAverageHours } from 'src/app/shared/models/stat-models/employee-average-hours';
import { EmployeeOrdersCount } from 'src/app/shared/models/stat-models/employee-orders-count';
import { IncomeFromJob } from 'src/app/shared/models/stat-models/income-from-job';
import { IncomeFromOrder } from 'src/app/shared/models/stat-models/income-from-order';
import { OrdersCount } from 'src/app/shared/models/stat-models/orders-count';
import { Overview } from 'src/app/shared/models/stat-models/overview';
import { SnackbarCallerService } from '../../../snackbar-caller.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(
    private http: HttpClient,
    private snackbarCaller: SnackbarCallerService
  ) {
    this.ping();
  }

  model = 'stat';
  _error = false;
  get error() {
    return this._error;
  }

  incomeFromEventByJobs(id: number) {
    return this.http.get<IncomeFromJob[]>(`/api/${this.model}/incomefromeventbyjobs/${id}`);
  }

  ordersCountByJob(id: string) {
    return this.http.get<OrdersCount>(`/api/${this.model}/orderscountbyjob/${id}`);
  }

  mostPopularFixedWageEmployees() {
    return this.http.get<EmployeeOrdersCount[]>(`/api/${this.model}/mostpopularfixedwageemployees`);
  }

  incomeFromFixedWageOrdersInYear(year: number) {
    return this.http.get<number>(`/api/${this.model}/incomefromfixedwageordersinyear/${year}`);
  }

  hourlyWageEmployeesAverageHours() {
    return this.http.get<EmployeeAverageHours[]>(`/api/${this.model}/hourlywageemployeesaveragehours`);
  }

  hourlyWageOrdersOverview() {
    return this.http.get<IncomeFromOrder[]>(`/api/${this.model}/hourlywageordersoverview`);
  }

  overallOverview() {
    return this.http.get<Overview>(`/api/${this.model}/overalloverview`);
  }
 
  ping() {
    this._error = false;
    this.http.get('/api', { responseType: 'text' }).pipe(
      catchError((err) => {
        this._error = true;
        this.snackbarCaller.failure('There was an error while trying to connect to the endpoint');
        return of([]);
      })
    ).subscribe();
  }
}
