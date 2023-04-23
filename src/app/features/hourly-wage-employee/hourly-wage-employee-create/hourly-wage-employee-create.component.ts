import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { EmployeeCreateComponent } from 'src/app/shared/components/common/generic/employee-create/employee-create.component';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { WorkHoursValidator } from '../validators/work-hours-validator';

@Component({
  selector: 'app-hourly-wage-employee-create',
  templateUrl: './hourly-wage-employee-create.component.html',
  styleUrls: ['./hourly-wage-employee-create.component.css']
})
export class HourlyWageEmployeeCreateComponent extends EmployeeCreateComponent<HourlyWageEmployee> {
  constructor(
    private formBuilder: FormBuilder,
    jobService: JobService,
    service: HourlyWageEmployeeService,
    snackbarCaller: SnackbarCallerService
  ) {
    super(jobService, service, snackbarCaller);
  }

  private setFromMinHours = false;
  private setFromMaxHours = false;

  override ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      hireDate: new FormControl(
        null
      ),
      id: new FormControl(
        null,
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
            Validators.required,
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
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      jobId: new FormControl(
        null,
        {
          validators: [
            Validators.required
          ]
        }
      ),
      wage: new FormControl(
        null,
        {
          validators: [
            Validators.required,
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
            Validators.required,
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
            Validators.required,
            Validators.min(2),
            Validators.max(12)
          ],
          updateOn: 'blur'
        }
      ),
      emailAddress: new FormControl(
        null,
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
        null,
        {
          updateOn: 'blur'
        }
      )
    });

    this.createForm.controls['minHours'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.createForm.controls['maxHours'].setValidators([
          Validators.required,
          Validators.min(2),
          Validators.max(12),
          WorkHoursValidator.maxhours(this.createForm.controls['minHours'].value)
        ]);

        if (!this.setFromMaxHours) {
          this.setFromMinHours = true;
          this.createForm.controls['maxHours'].updateValueAndValidity();
        }
        else {
          this.setFromMinHours = false;
          this.setFromMaxHours = false;
        }
      });

    this.createForm.controls['maxHours'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.createForm.controls['minHours'].setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          WorkHoursValidator.minhours(this.createForm.controls['maxHours'].value)
        ]);

        if (!this.setFromMinHours) {
          this.setFromMaxHours = true;
          this.createForm.controls['minHours'].updateValueAndValidity();
        }
        else {
          this.setFromMaxHours = false;
          this.setFromMinHours = false;
        }
      });

    this.ngOnInit();
  }

  protected override resetForm() {
    this.createForm.reset({
      hireDate: new Date(),
      id: null,
      firstName: '',
      lastName: '',
      jobId: null,
      wage: null,
      minHours: null,
      maxHours: null,
      emailAddress: null,
      phoneNumber: null
    });
  }
}
