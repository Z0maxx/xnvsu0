import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';

@Component({
  selector: 'app-hourly-wage-order-list',
  templateUrl: './hourly-wage-order-list.component.html',
  styleUrls: ['./hourly-wage-order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyWageOrderListComponent extends ListComponent<HourlyWageOrder> {
  protected override readonly displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'hours', 'emailAddress', 'phoneNumber', 'employeeFirstName', 'employeeLastName', 'employee', 'update', 'delete'];
}
