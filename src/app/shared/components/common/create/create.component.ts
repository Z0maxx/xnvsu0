import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export abstract class CreateComponent<T extends TableModel> extends BaseComponent<T> implements OnInit {
  constructor(
    protected snackbarCaller: SnackbarCallerService,
    service: CrudService<T>,
  ) {
    super(service);
  }
  
  protected creating = false;
  protected createForm!: FormGroup;

  protected get modelName() {
    return this.service.modelName;
  }

  protected createItem() {
    this.creating = true;
    this.patchValues();
    
    this.service.create(this.createForm.getRawValue())
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        error: (err: Error) => {
          this.creating = false;
          this.snackbarCaller.failure(err.message);
        },
        complete: () => {
          this.creating = false;
          this.snackbarCaller.success(`Created ${this.service.modelName} succesfully`);
          this.resetForm();
        }
      });
  }

  protected abstract patchValues(): void;
  protected abstract resetForm(): void;
  abstract ngOnInit(): void;
}
