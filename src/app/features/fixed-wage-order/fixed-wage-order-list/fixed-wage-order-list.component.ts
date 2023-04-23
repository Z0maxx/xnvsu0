import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';


@Component({
  selector: 'app-fixed-wage-order-list',
  templateUrl: './fixed-wage-order-list.component.html',
  styleUrls: ['./fixed-wage-order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedWageOrderListComponent extends ListComponent<FixedWageOrder> {
  protected override displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'eventtype', 'emailAddress', 'phoneNumber', 'employeeFirstName', 'employeeLastName', 'employee', 'update', 'delete'];
}
