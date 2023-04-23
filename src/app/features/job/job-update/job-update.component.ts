import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { UpdateComponent } from 'src/app/shared/components/common/update/update.component';
import { Job } from 'src/app/shared/models/table-models/job';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent extends UpdateComponent<Job> {
  constructor(
    private formBuilder: FormBuilder,
    service: JobService,
    route: ActivatedRoute,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    dialog: MatDialog
  ) {
    super(route, snackbarCaller, router, dialog, 'jobs', service);
  }
  
  override ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: new FormControl(
        { value: this.id, disabled: true }
      ),
      name: new FormControl(
        '',
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      )
    });

    super.ngOnInit();
  }

  protected override updateData() {}

  protected override patchValues() {
    if (this.updateForm.controls['id'].value == '') {
      this.updateForm.patchValue({ id: null });
    }
    if (this.updateForm.controls['name'].value == '') {
      this.updateForm.patchValue({ name: this.oldItem.name });
    }
  }

  protected override resetForm() {
    this.updateForm.reset({
      id: this.id,
      name: ''
    });
  }
}
