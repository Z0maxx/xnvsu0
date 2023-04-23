import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';

@Component({
  selector: 'app-fixed-wage-employee',
  templateUrl: './fixed-wage-employee.component.html',
  styleUrls: ['./fixed-wage-employee.component.css']
})
export class FixedWageEmployeeComponent extends TableModelComponent<FixedWageEmployee> {
  constructor(
    service: FixedWageEmployeeService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService
  ) {
    super(dialog, snackbarCaller, service);
  }
}
