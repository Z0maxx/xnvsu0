import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedWageOrderService } from 'src/app/core/services/features/models/table/fixed-wage-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';

@Component({
  selector: 'app-fixed-wage-order-single',
  templateUrl: './fixed-wage-order-single.component.html',
  styleUrls: ['./fixed-wage-order-single.component.css']
})
export class FixedWageOrderSingleComponent extends SingleComponent<FixedWageOrder> {
  constructor(
    service: FixedWageOrderService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'fixedwageorders', service);
  }

  protected override displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'eventtype', 'emailAddress', 'phoneNumber', 'employeeFirstName', 'employeeLastName', 'employee', 'update', 'delete'];
}
