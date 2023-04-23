import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { CreateComponent } from 'src/app/shared/components/common/create/create.component';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';

@Component({
  selector: 'app-eventtype-create',
  templateUrl: './eventtype-create.component.html',
  styleUrls: ['./eventtype-create.component.css']
})
export class EventtypeCreateComponent extends CreateComponent<Eventtype> {
  constructor(
    private formBuilder: FormBuilder,
    service: EventtypeService,
    snackbarCaller: SnackbarCallerService,
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

  protected override resetForm() {
    this.createForm.reset({
      id: null,
      name: ''
    });
  }

  protected override patchValues() {
    if (this.createForm.controls['id'].value == '') {
      this.createForm.patchValue({ id: null });
    }
  }
}
