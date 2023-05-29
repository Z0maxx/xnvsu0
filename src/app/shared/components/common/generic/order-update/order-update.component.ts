import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/features/models/table/generic/employee.service';
import { OrderService } from 'src/app/core/services/features/models/table/generic/order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';
import { TimeValidator } from 'src/app/shared/validators/time-validator';
import { DialogComponent } from '../../../dialog/dialog.component';
import { UpdateComponent } from '../../update/update.component';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export abstract class OrderUpdateComponent<
  T extends FixedWageOrder | HourlyWageOrder,
  S extends FixedWageEmployee | HourlyWageEmployee,
  U extends FixedWageOrder | HourlyWageOrder,
  K extends FixedWageEmployee | HourlyWageEmployee
> extends UpdateComponent<T> {
  constructor(
    protected otherOrderService: OrderService<U, K>,
    protected employeeService: EmployeeService<S>,
    protected override service: OrderService<T, S>,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService,
    @Inject('modelRoute') modelRoute: string
  ) {
    super(route, snackbarCaller, router, dialog, modelRoute, service);
  }

  protected updateAllOrders = false;
  protected updateOrders = false;
  protected ordersForCustomer!: T[];
  protected otherOrdersForCustomer!: U[];
  protected initCheck = true;
  protected readonly minDate = TimeValidator.getMinDate();
  protected employees$!: Observable<S[]>;

  override ngOnInit() {
    const employeeIdControl = this.updateForm.controls['employeeId']

    this.service.availableDeleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        if (employeeIdControl.value == deleted.deletedId) {
          employeeIdControl.setValue(null);
          this.snackbarCaller.alert(`Selected ${this.employeeService.modelName} got deleted`);
        }
      });

    this.service.availableRemoved
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((removed) => {
        if (employeeIdControl.value == removed.deletedId) {
          employeeIdControl.setValue(null);
          this.snackbarCaller.alert(`Selected ${this.employeeService.modelName} got taken`);
        }
      });

    this.updateForm.controls['employeeId'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        const employeeId = this.updateForm.controls['employeeId'].value;
        if (employeeId) {
          this.updateOrderDateFilter(employeeId);
        }
        else {
          this.updateOrderDateFilter(this.oldItem.employeeId as string);
        }
      });

    super.ngOnInit();
  }

  protected override updateItem() {
    const confirm = this.dialog.open(DialogComponent, {
      data: {
        title: `Update ${this.service.modelName}`,
        message: `Are you sure you want to update this ${this.service.modelName}?`,
        confirm: 'Update'
      }
    });

    confirm.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.updating = true;
        this.patchValues();

        if (this.ordersForCustomer.length == 1 || (!this.updateAllOrders && !this.updateOrders)) {
          if (!this.updateAllOrders) this.otherOrdersForCustomer = [];
          let raw = this.updateForm.getRawValue();
          const orderDate = new Date(moment(raw.orderDate).format('yyyy-MM-DDThh:mm:ss'));
          orderDate.setHours(orderDate.getHours() - orderDate.getTimezoneOffset() / 60);
          raw.orderDate = orderDate;
          this.service.update(raw)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
              error: (err) => {
                this.handleError(err);
              },
              complete: () => {
                this.completeOrders();
              }
            });
        }

        else if (this.ordersForCustomer.length > 1 && (this.updateAllOrders || this.updateOrders)) {
          if (this.updateOrders) this.otherOrdersForCustomer = [];
          this.service.updateBulk(this.ordersForCustomer)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
              error: (err) => {
                this.handleError(err);
              },
              complete: () => {
                this.completeOrders();
              }
            });
        }

        if (this.otherOrdersForCustomer.length == 1 && this.updateAllOrders) {
          this.otherOrderService.update(this.otherOrdersForCustomer[0])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
              error: (err) => {
                this.handleError(err);
              },
              complete: () => {
                this.completeOtherOrders();
              }
            });
        }

        else if (this.otherOrdersForCustomer.length > 1 && this.updateAllOrders) {
          this.otherOrderService.updateBulk(this.otherOrdersForCustomer)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
              error: (err) => {
                this.handleError(err);
              },
              complete: () => {
                this.completeOtherOrders();
              }
            });
        }
      });
  }

  private handleError(err: Error) {
    this.snackbarCaller.failure(err.message);
  }

  private completeOrders() {
    this.ordersForCustomer = [];
    this.complete();
  }

  private completeOtherOrders() {
    this.otherOrdersForCustomer = [];
    this.complete();
  }

  private complete() {
    if (this.ordersForCustomer.length != 0 || this.otherOrdersForCustomer.length != 0) return;
    this.snackbarCaller.success(`Updated ${this.service.modelName} succesfully`);
    this.resetForm();
    this.end();
  }

  protected override updateData() {
    this.updateOrderDateFilter(this.oldItem.employeeId as string);
    this.employees$ = this.service.getAvailableEmployeesForOrder(this.oldItem);

    const employeeIdControl = this.updateForm.controls['employeeId'];
    if (this.oldItem.employee == null) {
      if (!this.initCheck) {
        this.snackbarCaller.alert(`Original ${this.employeeService.modelName} got deleted`);
      }
      employeeIdControl.addValidators(Validators.required);
    }
    else {
      employeeIdControl.removeValidators(Validators.required);
    }

    this.service.getAllForCustomer(this.oldItem)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.ordersForCustomer = data;
      });

    this.otherOrderService.getAllForCustomer(this.oldItem)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.otherOrdersForCustomer = data;
      });

    this.updateForm.updateValueAndValidity();
    this.initCheck = false;
  }

  private updateOrderDateFilter(employeeId: string) {
    if (employeeId) {
      this.employeeService.get(employeeId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((employee) => {
        if (employee.id != '-1') {
          this.orderDateFilter = (d: Date | null): boolean => {
            const dates = employee.orders.map(o => moment(o.orderDate).format('YYYY-MM-dd'));
            const date = moment(d).format('YYYY-MM-dd');
            const oldItemDate = moment(this.oldItem.orderDate).format('YYYY-MM-dd');
            if (this.oldItem.employeeId == employee.id && oldItemDate == date) return true;
            return !dates.includes(date);
          }
        }
      });
    }

    else {
      this.orderDateFilter = (d: Date | null): boolean => {
        return true;
      }
    }
  }

  protected override patchValues() {
    let orderDate = this.updateForm.controls['orderDate'].value;
    if (orderDate == null) {
      this.updateForm.patchValue({ orderDate: moment(this.oldItem.orderDate) });
    }
    else {
      this.updateAllOrders = true;
      for (const order of this.ordersForCustomer) {
        order.orderDate = orderDate;
      }
      for (const order of this.otherOrdersForCustomer) {
        order.orderDate = orderDate;
      }
    }

    const firstName = this.updateForm.controls['firstName'].value
    if (firstName == '') {
      this.updateForm.patchValue({ firstName: this.oldItem.firstName });
    }
    else {
      this.updateAllOrders = true;
      for (const order of this.ordersForCustomer) {
        order.firstName = firstName;
      }
      for (const order of this.otherOrdersForCustomer) {
        order.firstName = firstName;
      }
    }

    const lastName = this.updateForm.controls['lastName'].value;
    if (lastName == '') {
      this.updateForm.patchValue({ lastName: this.oldItem.lastName });
    }
    else {
      this.updateAllOrders = true;
      for (const order of this.ordersForCustomer) {
        order.lastName = lastName;
      }
      for (const order of this.otherOrdersForCustomer) {
        order.lastName = lastName;
      }
    }

    const emailAddress = this.updateForm.controls['emailAddress'].value;
    if (emailAddress == '') {
      this.updateForm.patchValue({ emailAddress: this.oldItem.emailAddress });
    }
    else {
      this.updateAllOrders = true;
      for (const order of this.ordersForCustomer) {
        order.emailAddress = emailAddress;
      }
      for (const order of this.otherOrdersForCustomer) {
        order.lastName = emailAddress;
      }
    }

    const phoneNumber = this.updateForm.controls['phoneNumber'].value;
    if (phoneNumber == '') {
      this.updateForm.patchValue({ phoneNumber: this.oldItem.phoneNumber });
    }
    else {
      this.updateAllOrders = true;
      for (const order of this.ordersForCustomer) {
        order.phoneNumber = phoneNumber;
      }
      for (const order of this.otherOrdersForCustomer) {
        order.phoneNumber = phoneNumber;
      }
    }

    const employeeId = this.updateForm.controls['employeeId'].value;
    if (employeeId == null) {
      this.updateForm.patchValue({ employeeId: this.oldItem.employeeId });
    }
    else {
      const self = this.ordersForCustomer.find(o => o.id == this.id);
      if (self) {
        self.employeeId = employeeId;
      }
    }
  }

  protected orderDateFilter = (d: Date | null): boolean => {
    return true;
  }

  override ngOnDestroy() {
    this.otherOrderService.unsubscribe();
    this.employeeService.unsubscribe();
    super.ngOnDestroy();
  }
}
