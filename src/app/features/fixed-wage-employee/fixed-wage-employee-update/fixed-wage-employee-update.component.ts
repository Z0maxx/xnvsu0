import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { EmployeeUpdateComponent } from 'src/app/shared/components/common/generic/employee-update/employee-update.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';

@Component({
  selector: 'app-fixed-wage-employee-update',
  templateUrl: './fixed-wage-employee-update.component.html',
  styleUrls: ['./fixed-wage-employee-update.component.css']
})
export class FixedWageEmployeeUpdateComponent extends EmployeeUpdateComponent<FixedWageEmployee> {
  constructor(
    private formBuilder: FormBuilder,
    jobService: JobService,
    service: FixedWageEmployeeService,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService
  ) {
    super(jobService, service, dialog, router, route, snackbarCaller, 'fixed-wage-employees');
  }

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
      hours: new FormControl(
        null,
        {
          validators: [
            Validators.min(1),
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

    super.ngOnInit();
  }

  protected override resetForm() {
    this.updateForm.reset({
      hireDate: this.oldItem.hireDate,
      id: this.id,
      firstName: '',
      lastName: '',
      jobId: null,
      wage: null,
      hours: null,
      emailAddress: '',
      phoneNumber: ''
    });
  }

  protected override patchValues() {
    if (this.updateForm.controls['hours'].value == null) {
      this.updateForm.patchValue({ hours: this.oldItem.hours });
    }

    super.patchValues();
  }
}
