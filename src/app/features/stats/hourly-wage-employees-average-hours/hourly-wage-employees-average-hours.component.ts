import { Component, Input } from '@angular/core';
import { EmployeeAverageHours } from 'src/app/shared/models/stat-models/employee-average-hours';

@Component({
  selector: 'app-hourly-wage-employees-average-hours',
  templateUrl: './hourly-wage-employees-average-hours.component.html',
  styleUrls: ['./hourly-wage-employees-average-hours.component.css']
})
export class HourlyWageEmployeesAverageHoursComponent {
  @Input() employeesAverageHours: EmployeeAverageHours[] = [];

  displayedColumns = ['employeeName', 'averageHours'];
}
