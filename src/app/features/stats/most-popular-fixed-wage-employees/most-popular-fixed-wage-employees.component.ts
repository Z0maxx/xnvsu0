import { Component, Input } from '@angular/core';
import { EmployeeOrdersCount } from 'src/app/shared/models/stat-models/employee-orders-count';

@Component({
  selector: 'app-most-popular-fixed-wage-employees',
  templateUrl: './most-popular-fixed-wage-employees.component.html',
  styleUrls: ['./most-popular-fixed-wage-employees.component.css']
})
export class MostPopularFixedWageEmployeesComponent {
  @Input() employeeOrdersCounts: EmployeeOrdersCount[] = [];

  displayedColumns = ['employeeName', 'ordersCount'];
}
