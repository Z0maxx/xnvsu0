import { Component, Input } from '@angular/core';
import { IncomeFromOrder } from 'src/app/shared/models/stat-models/income-from-order';

@Component({
  selector: 'app-hourly-wage-orders-overview',
  templateUrl: './hourly-wage-orders-overview.component.html',
  styleUrls: ['./hourly-wage-orders-overview.component.css']
})
export class HourlyWageOrdersOverviewComponent {
  @Input() incomeFromOrders: IncomeFromOrder[] = [];

  displayedColumns = ['orderDate', 'employeeName', 'income'];
}
