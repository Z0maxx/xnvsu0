import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';

@Component({
  selector: 'app-fixed-wage-employee-single',
  templateUrl: './fixed-wage-employee-single.component.html',
  styleUrls: ['./fixed-wage-employee-single.component.css']
})
export class FixedWageEmployeeSingleComponent extends SingleComponent<FixedWageEmployee> {
  constructor(
    service: FixedWageEmployeeService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'fixed-wage-employees', service);
  }

  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'job', 'wage', 'hours', 'emailAddress', 'phoneNumber', 'orders', 'update', 'delete'];
}
