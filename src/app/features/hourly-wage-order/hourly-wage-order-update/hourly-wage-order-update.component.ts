import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, takeUntil } from 'rxjs';
import { FixedWageOrderService } from 'src/app/core/services/features/models/table/fixed-wage-order.service';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { HourlyWageOrderService } from 'src/app/core/services/features/models/table/hourly-wage-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { OrderUpdateComponent } from 'src/app/shared/components/common/generic/order-update/order-update.component';
import { UpdateComponent } from 'src/app/shared/components/common/update/update.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';
import { TimeValidator } from 'src/app/shared/validators/time-validator';

@Component({
  selector: 'app-hourly-wage-order-update',
  templateUrl: './hourly-wage-order-update.component.html',
  styleUrls: ['./hourly-wage-order-update.component.css']
})
export class HourlyWageOrderUpdateComponent extends OrderUpdateComponent<HourlyWageOrder, HourlyWageEmployee, FixedWageOrder, FixedWageEmployee> {
  constructor(
    private formBuilder: FormBuilder,
    otherOrderService: FixedWageOrderService,
    employeeService: HourlyWageEmployeeService,
    service: HourlyWageOrderService,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService
  ) {
    super(otherOrderService, employeeService, service, dialog, router, route, snackbarCaller, 'hourly-wage-orders');
  }

  private setFromUpdate = false;

  protected employee!: HourlyWageEmployee | undefined;

  override ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: new FormControl(
        { value: this.id, disabled: true },
        {
          validators: [
            Validators.min(1)
          ],
          updateOn: 'blur'
        }
      ),
      orderDate: new FormControl(
        null,
        {
          validators: [
            TimeValidator.minhours(8),
            TimeValidator.maxhours(22),
            TimeValidator.seconds(),
            TimeValidator.minutes()
          ]
        }
      ),
      firstName: new FormControl(
        '',
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      lastName: new FormControl(
        '',
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      hours: new FormControl(
        null,
        {
          updateOn: 'blur'
        }
      ),
      emailAddress: new FormControl(
        '',
        {
          validators: [
            Validators.email,
            Validators.minLength(10),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      phoneNumber: new FormControl(
        '',
        {
          updateOn: 'blur'
        }
      ),
      employeeId: new FormControl(
        null
      )
    });

    this.updateForm.controls['employeeId'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        let employeeId = this.updateForm.controls['employeeId'].value;
        if (!employeeId) {
          employeeId = this.oldItem.employee?.id;
        }
        this.employeeService.get(employeeId)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((employee) => {
            if (employee.id != '-1') {
              this.updateForm.controls['hours'].setValidators([Validators.min(employee.minHours), Validators.max(employee.maxHours)]);

              if (employee.minHours > this.oldItem.hours || employee.maxHours < this.oldItem.hours) {
                this.updateForm.controls['hours'].addValidators(Validators.required);
              }
              if (!this.setFromUpdate) {
                this.updateForm.controls['hours'].updateValueAndValidity();
              }
              else {
                this.setFromUpdate = false;
              }
            }
          });
      });

    super.ngOnInit();
  }

  protected override patchValues() {
    if (this.updateForm.controls['hours'].value == null) {
      this.updateForm.patchValue({ hours: this.oldItem.hours });
    }

    super.patchValues();
  }

  protected override updateData() {
    if (this.oldItem.employee != null) {
      this.employeeService.get(this.oldItem.employee.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((employee) => {
          if (employee.id != '-1') {
            this.updateForm.controls['hours'].setValidators([Validators.min(employee.minHours), Validators.max(employee.maxHours)]);
          }
        });
    }

    super.updateData();
  }

  protected override resetForm() {
    this.updateForm.reset({
      id: this.id,
      orderDate: null,
      firstName: '',
      lastName: '',
      hours: null,
      emailAddress: '',
      phoneNumber: '',
      employeeId: null
    });
  }
}
