import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HourlyWageOrderService } from 'src/app/core/services/features/models/table/hourly-wage-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';

@Component({
  selector: 'app-hourly-wage-order-single',
  templateUrl: './hourly-wage-order-single.component.html',
  styleUrls: ['./hourly-wage-order-single.component.css']
})
export class HourlyWageOrderSingleComponent extends SingleComponent<HourlyWageOrder> {
  constructor(
    service: HourlyWageOrderService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'hourly-wage-orders', service);
  }
  protected override readonly displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'hours', 'emailAddress', 'phoneNumber', 'employeeFirstName', 'employeeLastName', 'employee', 'update', 'delete'];
}
