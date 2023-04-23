import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, takeUntil } from 'rxjs';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { FixedWageOrderService } from 'src/app/core/services/features/models/table/fixed-wage-order.service';
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
  selector: 'fixed-wage-order-update',
  templateUrl: './fixed-wage-order-update.component.html',
  styleUrls: ['./fixed-wage-order-update.component.css']
})
export class FixedWageOrderUpdateComponent extends OrderUpdateComponent<FixedWageOrder, FixedWageEmployee, HourlyWageOrder, HourlyWageEmployee> {
  constructor(
    private eventtypeService: EventtypeService,
    private formBuilder: FormBuilder,
    otherOrderService: HourlyWageOrderService,
    employeeService: FixedWageEmployeeService,
    service: FixedWageOrderService,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService
  ) {
    super(otherOrderService, employeeService, service, dialog, router, route, snackbarCaller, 'fixed-wage-orders');
  }

  protected readonly eventtypes$ = this.eventtypeService.getAll();

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
      eventTypeId: new FormControl(
        null
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

    this.eventtypeService.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        const eventTypeIdControl = this.updateForm.controls['eventTypeId'];
        if (eventTypeIdControl.value == deleted.deletedId) {
          eventTypeIdControl.setValue(null);
          this.snackbarCaller.alert(`Selected ${this.eventtypeService.modelName} got deleted`);
        }
      });

    super.ngOnInit();
  }
  
  protected override patchValues() {
    const eventTypeId = this.updateForm.controls['eventTypeId'].value;
    if (eventTypeId == null) {
      this.updateForm.patchValue({ eventTypeId: this.oldItem.eventTypeId });
    }
    else {
      this.updateOrders = true;
      for (const order of this.ordersForCustomer) {
        order.eventTypeId = eventTypeId;
      }
    }
  }

  protected override resetForm() {
    this.updateForm.reset({
      id: this.id,
      orderDate: null,
      firstName: '',
      lastName: '',
      eventTypeId: null,
      emailAddress: '',
      phoneNumber: '',
      employeeId: null
    });
  }

  protected override updateData() {
    const eventTypeIdControl = this.updateForm.controls['eventTypeId'];
    if (this.oldItem.eventType == null) {
      if (!this.initCheck) {
        this.snackbarCaller.alert(`Original ${this.eventtypeService.modelName} got deleted`);
      }
      eventTypeIdControl.addValidators(Validators.required);
    }
    else {
      eventTypeIdControl.removeValidators(Validators.required);
    }

    super.updateData();
  }

  override ngOnDestroy() {
    this.eventtypeService.unsubscribe();
    this.ngOnDestroy();
  }
}
