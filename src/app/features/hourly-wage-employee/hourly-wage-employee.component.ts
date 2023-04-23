import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';

@Component({
  selector: 'app-hourly-wage-employee',
  templateUrl: './hourly-wage-employee.component.html',
  styleUrls: ['./hourly-wage-employee.component.css']
})
export class HourlyWageEmployeeComponent extends TableModelComponent<HourlyWageEmployee> {
  constructor(
    service: HourlyWageEmployeeService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService
  ) {
    super(dialog, snackbarCaller, service);
  }
}
