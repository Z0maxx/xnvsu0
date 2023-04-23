import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';


@Component({
  selector: 'app-fixed-wage-employee-list',
  templateUrl: './fixed-wage-employee-list.component.html',
  styleUrls: ['./fixed-wage-employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedWageEmployeeListComponent extends ListComponent<FixedWageEmployee> {
  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'job', 'wage', 'hours', 'emailAddress', 'phoneNumber', 'orders', 'update', 'delete'];
}
