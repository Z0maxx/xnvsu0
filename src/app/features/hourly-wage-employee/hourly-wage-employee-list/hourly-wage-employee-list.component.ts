import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';


@Component({
  selector: 'app-hourly-wage-employee-list',
  templateUrl: './hourly-wage-employee-list.component.html',
  styleUrls: ['./hourly-wage-employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyWageEmployeeListComponent extends ListComponent<HourlyWageEmployee> {
  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'job', 'wage', 'hours', 'emailAddress', 'phoneNumber', 'orders', 'update', 'delete'];
}
