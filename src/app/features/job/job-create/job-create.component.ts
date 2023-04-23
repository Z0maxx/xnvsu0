import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { CreateComponent } from 'src/app/shared/components/common/create/create.component';
import { Job } from 'src/app/shared/models/table-models/job';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent extends CreateComponent<Job> {
  constructor(
    private formBuilder: FormBuilder,
    service: JobService,
    snackbarCaller: SnackbarCallerService
  ) {
    super(snackbarCaller, service);
  }

  override ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: new FormControl(
        null,
        {
          validators: [
            Validators.min(1)
          ],
          updateOn: 'blur'
        }
      ),
      name: new FormControl(
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      )
    });
  }

  protected override patchValues() {
    if (this.createForm.controls['id'].value == '') {
      this.createForm.patchValue({ id: null });
    }
  }

  protected override resetForm() {
    this.createForm.reset({
      id: '',
      name: ''
    });
  }
}
