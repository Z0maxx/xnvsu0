import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';


@Component({
  selector: 'app-hourly-wage-employee-single',
  templateUrl: './hourly-wage-employee-single.component.html',
  styleUrls: ['./hourly-wage-employee-single.component.css']
})
export class HourlyWageEmployeeSingleComponent extends SingleComponent<HourlyWageEmployee> {
  constructor(
    service: HourlyWageEmployeeService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'hourly-wage-employees', service);
  }

  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'job', 'wage', 'hours', 'emailAddress', 'phoneNumber', 'orders', 'update', 'delete'];
}
