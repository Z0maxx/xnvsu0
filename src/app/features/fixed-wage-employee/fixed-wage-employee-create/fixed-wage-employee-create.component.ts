import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { EmployeeCreateComponent } from 'src/app/shared/components/common/generic/employee-create/employee-create.component';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';

@Component({
  selector: 'app-fixed-wage-employee-create',
  templateUrl: './fixed-wage-employee-create.component.html',
  styleUrls: ['./fixed-wage-employee-create.component.css']
})
export class FixedWageEmployeeCreateComponent extends EmployeeCreateComponent<FixedWageEmployee> implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    jobService: JobService,
    service: FixedWageEmployeeService,
    snackbarCaller: SnackbarCallerService
  ) {
    super(jobService, service, snackbarCaller);
  }

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
      hours: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.min(1),
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

    super.ngOnInit();
  }

  protected override resetForm() {
    this.createForm.reset({
      hireDate: new Date(),
      id: null,
      firstName: '',
      lastName: '',
      jobId: null,
      wage: null,
      hours: null,
      emailAddress: null,
      phoneNumber: null
    });
  }
}
