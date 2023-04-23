import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { EmployeeUpdateComponent } from 'src/app/shared/components/common/generic/employee-update/employee-update.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { WorkHoursValidator } from '../validators/work-hours-validator';
@Component({
  selector: 'app-hourly-wage-employee-update',
  templateUrl: './hourly-wage-employee-update.component.html',
  styleUrls: ['./hourly-wage-employee-update.component.css']
})
export class HourlyWageEmployeeUpdateComponent extends EmployeeUpdateComponent<HourlyWageEmployee> {
  constructor(
    private formBuilder: FormBuilder,
    jobService: JobService,
    service: HourlyWageEmployeeService,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService
  ) {
    super(jobService, service, dialog, router, route, snackbarCaller, 'hourly-wage-employees');
  }

  private setFromMinHours = false;
  private setFromMaxHours = false;

  override ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      hireDate: new FormControl(
        null
      ),
      id: new FormControl(
        { value: this.id, disabled: true },
        {
          validators: [
            Validators.min(1)
          ],
          updateOn: 'blur'
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
      jobId: new FormControl(
        null
      ),
      wage: new FormControl(
        null,
        {
          validators: [
            Validators.min(1000),
            Validators.max(99999)
          ],
          updateOn: 'blur'
        }
      ),
      minHours: new FormControl(
        null,
        {
          validators: [
            Validators.min(1),
            Validators.max(10)
          ],
          updateOn: 'blur'
        }
      ),
      maxHours: new FormControl(
        null,
        {
          validators: [
            Validators.min(2),
            Validators.max(12)
          ],
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
      )
    });

    this.updateForm.controls['minHours'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        const minHours = this.updateForm.controls['minHours'].value;
        if (minHours == '' || minHours == null) {
          this.updateForm.controls['maxHours'].setValidators([
            Validators.min(2),
            Validators.max(12),
            WorkHoursValidator.maxhours(this.oldItem.minHours)
          ]);
        }

        else {
          this.updateForm.controls['maxHours'].setValidators([
            Validators.min(2),
            Validators.max(12),
            WorkHoursValidator.maxhours(this.updateForm.controls['minHours'].value)
          ]);
        }
        

        if (!this.setFromMaxHours) {
          this.setFromMinHours = true;
          this.updateForm.controls['maxHours'].updateValueAndValidity();
        }
        else {
          this.setFromMinHours = false;
          this.setFromMaxHours = false;
        }
      });

    this.updateForm.controls['maxHours'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        const maxHours = this.updateForm.controls['maxHours'].value;
        if (maxHours == '' || maxHours == null) {
          this.updateForm.controls['minHours'].setValidators([
            Validators.min(2),
            Validators.max(12),
            WorkHoursValidator.minhours(this.oldItem.maxHours)
          ]);
        }

        else {
          this.updateForm.controls['minHours'].setValidators([
            Validators.min(1),
            Validators.max(10),
            WorkHoursValidator.minhours(this.updateForm.controls['maxHours'].value)
          ]);
        }

        if (!this.setFromMinHours) {
          this.setFromMaxHours = true;
          this.updateForm.controls['minHours'].updateValueAndValidity();
        }
        else {
          this.setFromMaxHours = false;
          this.setFromMinHours = false;
        }
      });

    super.ngOnInit();
  }

  protected override patchValues() {
    if (this.updateForm.controls['minHours'].value == null) {
      this.updateForm.patchValue({ minHours: this.oldItem.minHours });
    }
    if (this.updateForm.controls['maxHours'].value == null) {
      this.updateForm.patchValue({ maxHours: this.oldItem.maxHours });
    }

    super.patchValues();
  }

  protected override resetForm() {
    this.updateForm.reset({
      hireDate: this.oldItem.hireDate,
      id: this.id,
      firstName: '',
      lastName: '',
      jobId: null,
      wage: null,
      minHours: null,
      maxHours: null,
      emailAddress: '',
      phoneNumber: ''
    });
  }
}
