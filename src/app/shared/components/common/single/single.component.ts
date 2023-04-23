import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { DialogComponent } from '../../dialog/dialog.component';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export abstract class SingleComponent<T extends TableModel> extends BaseComponent<T> {
  constructor(
    private snackbarCaller: SnackbarCallerService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject('modelRoute') private modelRoute: string,
    service: CrudService<T>,
  ) {
    super(service)
  }

  private readonly id = this.route.snapshot.paramMap.get('id');

  protected readonly abstract displayedColumns: string[];
  protected readonly item$ = this.service.get(this.id ?? '0', true);
  protected deleting = false;

  protected deleteItem(item: T) {
    const confirm = this.dialog.open(DialogComponent, {
      data: {
        title: `Delete ${this.service.modelName}`,
        message: `Are you sure you want to delete this ${this.service.modelName}`,
        confirm: 'Delete'
      }
    });

    confirm.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.deleting = true;
      
      this.service.delete(item.id)
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
    this.router.navigate([this.modelRoute], { relativeTo: this.route.parent?.parent });
  }
}
