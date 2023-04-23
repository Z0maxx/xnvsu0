import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FixedWageOrderService } from 'src/app/core/services/features/models/table/fixed-wage-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';

@Component({
  selector: 'app-fixed-wage-order',
  templateUrl: './fixed-wage-order.component.html',
  styleUrls: ['./fixed-wage-order.component.css']
})
export class FixedWageOrderComponent extends TableModelComponent<FixedWageOrder> {
  constructor(
    service: FixedWageOrderService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService
  ) {
    super(dialog, snackbarCaller, service);
  }
}
