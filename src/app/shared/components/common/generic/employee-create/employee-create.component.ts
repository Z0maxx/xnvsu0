import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/features/models/table/generic/employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { CreateComponent } from '../../create/create.component';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export abstract class EmployeeCreateComponent<T extends FixedWageEmployee | HourlyWageEmployee> extends CreateComponent<T> {
  constructor(
    private jobService: JobService,
    service: EmployeeService<T>,
    snackbarCaller: SnackbarCallerService
  ) {
    super(snackbarCaller, service);
  }

  protected readonly jobs$ = this.jobService.getAll();

  override ngOnInit() {
    this.jobService.deleted
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((deleted) => {
      const jobIdControl = this.createForm.controls['jobId'];
      if (jobIdControl.value == deleted.deletedId) {
        jobIdControl.setValue(null);
        this.snackbarCaller.alert(`Selected ${this.jobService.modelName} got deleted`);
      }
    });
  }

  protected override patchValues() {
    this.createForm.patchValue({ hireDate: new Date() });
    if (this.createForm.controls['id'].value == null) {
      this.createForm.patchValue({ id: null });
    }
    if (this.createForm.controls['emailAddress'].value == '') {
      this.createForm.patchValue({ emailAddress: null });
    }
    if (this.createForm.controls['phoneNumber'].value == '') {
      this.createForm.patchValue({phoneNumber: null });
    }
  }

  override ngOnDestroy() {
    this.jobService.unsubscribe();
    super.ngOnDestroy();
  }
}
