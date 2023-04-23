import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HourlyWageOrderService } from 'src/app/core/services/features/models/table/hourly-wage-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';

@Component({
  selector: 'app-hourly-wage-order',
  templateUrl: './hourly-wage-order.component.html',
  styleUrls: ['./hourly-wage-order.component.css']
})
export class HourlyWageOrderComponent extends TableModelComponent<HourlyWageOrder> {
  constructor(
    service: HourlyWageOrderService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService
  ) {
    super(dialog, snackbarCaller, service)
  }
}
