import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { InnerListComponent } from 'src/app/shared/components/common/inner-list/inner-list.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';

@Component({
  selector: 'app-fixed-wage-employee-orders',
  templateUrl: './fixed-wage-employee-orders.component.html',
  styleUrls: ['./fixed-wage-employee-orders.component.css']
})
export class FixedWageEmployeeOrdersComponent extends InnerListComponent<FixedWageEmployee> {
  constructor(
    service: FixedWageEmployeeService,
    route: ActivatedRoute
  ) {
    super(service, route);
  }

  protected override readonly displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'details'];
}
