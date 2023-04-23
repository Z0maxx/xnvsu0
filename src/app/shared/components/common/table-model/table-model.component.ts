import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { DialogComponent } from '../../dialog/dialog.component';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-table-model',
  templateUrl: './table-model.component.html',
  styleUrls: ['./table-model.component.css']
})
export abstract class TableModelComponent<T extends TableModel> extends BaseComponent<T> {
  constructor(
    private dialog: MatDialog,
    private snackbarCaller: SnackbarCallerService,
    service: CrudService<T>,
  ) {
    super(service)
  }

  protected readonly items$ = this.service.getAll();
  protected deleting = false;

  protected deleteItem(eventtype: T) {
    const confirm = this.dialog.open(DialogComponent, {
      data: {
        title: `Delete ${this.service.modelName}`,
        message: `Are you sure you want to delete this ${this.service.modelName}?`,
        confirm: 'Delete'
      }
    });

    confirm.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.deleting = true;
        
        this.service.delete(eventtype.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            error: (err: Error) => {
              this.snackbarCaller.failure(err.message);
              this.end();
            },
            complete: () => {
              this.snackbarCaller.success(`Deleted ${this.service.modelName} successfully`);
              this.end();
            }
        });
      });
  }

  private end() {
    this.deleting = false;
  }
}
