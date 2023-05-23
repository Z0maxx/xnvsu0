import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/features/models/table/generic/employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { UpdateComponent } from '../../update/update.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export abstract class EmployeeUpdateComponent<T extends FixedWageEmployee | HourlyWageEmployee> extends UpdateComponent<T> {
  constructor(
    private jobService: JobService,
    service: EmployeeService<T>,
    dialog: MatDialog,
    router: Router,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService,
    @Inject('modelRoute') modelRoute: string
  ) {
    super(route, snackbarCaller, router, dialog, modelRoute, service);
  }

  private initCheck = true;

  protected readonly jobs$ = this.jobService.getAll();

  override ngOnInit() {
    this.jobService.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        const jobIdControl = this.updateForm.controls['jobId'];
        if (jobIdControl.value == deleted.deletedId) {
          jobIdControl.setValue(null);
          this.snackbarCaller.alert(`Selected ${this.jobService.modelName} got deleted`);
        }
      });

    super.ngOnInit();
  }

  protected override updateData() {
    const jobIdControl = this.updateForm.controls['jobId'];
    if (this.oldItem.job == null) {
      if (!this.initCheck) {
        this.snackbarCaller.alert(`Original ${this.jobService.modelName} got deleted`);
      }
      jobIdControl.addValidators(Validators.required);
    }
    else {
      jobIdControl.removeValidators(Validators.required);
    }

    this.updateForm.updateValueAndValidity();
    this.initCheck = false;
  }

  protected override patchValues() {
    this.updateForm.patchValue({ hireDate: this.oldItem.hireDate });
    if (this.updateForm.controls['firstName'].value == '') {
      this.updateForm.patchValue({ firstName: this.oldItem.firstName });
    }
    if (this.updateForm.controls['lastName'].value == '') {
      this.updateForm.patchValue({ lastName: this.oldItem.lastName });
    }
    if (this.updateForm.controls['jobId'].value == null) {
      this.updateForm.patchValue({ jobId: this.oldItem.jobId });
    }
    if (this.updateForm.controls['wage'].value == null) {
      this.updateForm.patchValue({ wage: this.oldItem.wage });
    }
    if (this.updateForm.controls['emailAddress'].value == '') {
      this.updateForm.patchValue({ emailAddress: null });
    }
    if (this.updateForm.controls['phoneNumber'].value == '') {
      this.updateForm.patchValue({ phoneNumber: null });
    }
  }

  override ngOnDestroy() {
    this.jobService.unsubscribe();
    super.ngOnDestroy();
  }
}
