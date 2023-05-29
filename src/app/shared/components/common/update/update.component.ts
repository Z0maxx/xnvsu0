import { Component, Inject, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { BaseComponent } from '../base/base.component';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { takeUntil } from 'rxjs';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export abstract class UpdateComponent<T extends TableModel> extends BaseComponent<T> implements OnInit {
  constructor(
    protected route: ActivatedRoute,
    protected snackbarCaller: SnackbarCallerService,
    protected router: Router,
    protected dialog: MatDialog,
    @Inject('modelRoute') protected modelRoute: string,
    service: CrudService<T>,
  ) {
    super(service);
  }

  protected readonly id = this.route.snapshot.paramMap.get('id');

  protected updating = false;
  protected oldItem!: T;
  protected updateForm!: FormGroup;

  ngOnInit() {
    this.service.get(this.id ?? '0', true)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data: T) => {
        if (!data.id) this.router.navigate([this.modelRoute], { relativeTo: this.route.parent?.parent });
        else {
          this.oldItem = data;
          this.updateData();
        }
      });
  }

  protected updateItem() {
    const confirm = this.dialog.open(DialogComponent, {
      data: {
        title: `Update ${this.service.modelName}`,
        message: `Are you sure you want to update this ${this.service.modelName}?`,
        confirm: 'Update'
      }
    });

    confirm.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.updating = true;
        this.patchValues();

        this.service.update(this.updateForm.getRawValue())
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            error: (err: Error) => {
              this.snackbarCaller.failure(err.message);
              this.end();
            },
            complete: () => {
              this.snackbarCaller.success(`Updated ${this.service.modelName} succesfully`);
              this.resetForm();
              this.end();
            }
          });
      });
  }

  protected end() {
    this.updating = false;
  }

  protected abstract resetForm(): void;
  protected abstract patchValues(): void;
  protected abstract updateData(): void;
}
