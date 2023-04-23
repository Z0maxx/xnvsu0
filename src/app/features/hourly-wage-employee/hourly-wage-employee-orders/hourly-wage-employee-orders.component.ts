import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { InnerListComponent } from 'src/app/shared/components/common/inner-list/inner-list.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';

@Component({
  selector: 'app-hourly-wage-employee-orders',
  templateUrl: './hourly-wage-employee-orders.component.html',
  styleUrls: ['./hourly-wage-employee-orders.component.css']
})
export class HourlyWageEmployeeOrdersComponent extends InnerListComponent<HourlyWageEmployee> {
  constructor(
    service: HourlyWageEmployeeService,
    route: ActivatedRoute
  ) {
    super(service, route);
  }

  protected override readonly displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'details'];
}
