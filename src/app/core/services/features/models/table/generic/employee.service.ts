import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject, merge, scan } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { Deleted } from 'src/app/shared/models/change-models/deleted';
import { Updated } from 'src/app/shared/models/change-models/updated';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { Order } from 'src/app/shared/models/table-models/generic-models/order';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeService<T extends FixedWageEmployee | HourlyWageEmployee> extends CrudService<T> {
  constructor(
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService,
    @Inject('model') model: string
  ) {
    super(http, snackbarCaller, hubService, model, 'Employee');

    this.created.subscribe((created) => {
      if (created.jobId == this.jobId) {
        this.availableCreatedChange$.next(created);
      }
    });

    this.updated.subscribe((updated) => {
      const employee = updated.updatedItem;
      this.checkUpdate(updated, employee);
    });

    this.updatedBulk.subscribe((updatedBulk) => {
      const updatedFiltered = updatedBulk.filter(u => u.updatedItem.jobId == this.jobId);
      updatedFiltered.map(updated => {
        this.http.get<T>(`/api/${this.model}/${updated.updatedId}`).subscribe((employee) => {
          this.checkUpdate(updated, employee);
        });
      });
    });

    this.deleted.subscribe((deleted) => {
      this.availableDeletedChange$.next(deleted);
    });
  }

  private jobId!: number;
  private orderDate!: string;
  private readonly availableCreatedChange$ = new Subject<T>;
  private readonly availableUpdatedChange$ = new Subject<Updated<T>>;
  private readonly availableDeletedChange$ = new Subject<Deleted<T>>;
  private readonly availableRemovedChange$ = new Subject<Deleted<T>>;
  
  protected readonly availableCreated$ = this.availableCreatedChange$.asObservable();
  protected readonly availableUpdated$ = this.availableUpdatedChange$.asObservable();
  protected readonly availableDeleted$ = this.availableDeletedChange$.asObservable();
  protected readonly availableRemoved$ = this.availableRemovedChange$.asObservable();

  get availableCreated() {
    return this.availableCreated$;
  }
  get availableUpdated() {
    return this.availableUpdated$;
  }
  get availableDeleted() {
    return this.availableDeleted$;
  }
  get availableRemoved() {
    return this.availableRemoved$;
  }

  private checkUpdate(updated: Updated<T>, employee: T) {
    const orders = (employee.orders as Order[]);
    if (orders.find(o => moment(o.orderDate).format('YYYY-MM-DD') == this.orderDate)) {
      this.availableRemovedChange$.next({ deletedId: employee.id, deletedItem: employee});
    }
    else {
      this.availableUpdatedChange$.next(updated);
    }
  }

  getAvailable(date: moment.Moment, jobId: number) {
    this._sendInfo = true;
    this.orderDate = date.format('YYYY-MM-DD');
    this.jobId = jobId;
    let seed: any[] = []

    return merge(
      this.http.get<T[]>(`/api/${this.model}/available/${this.orderDate}/${jobId}`),
      this.availableCreated$,
      this.availableUpdated$,
      this.availableDeleted$,
      this.availableRemoved$
    ).pipe(
      scan((acc: any[], value: any) => {
        const updated = value as Updated<T>;
        const deleted = value as Deleted<T>;

        if (deleted.deletedId) {
          const idx = acc.findIndex((v: T) => v.id == deleted.deletedId);
          acc.splice(idx, 1);
          return acc;
        }
        else if (updated.updatedId) {
          const idx = acc.findIndex((v: T) => v.id == updated.updatedId);
          if (idx > -1) acc.splice(idx, 1);
          if (updated.updatedItem.jobId == this.jobId) {
            acc.splice(idx, 0, updated.updatedItem);
          }
          return acc;
        }
        else {
          return acc.concat(value);
        }
      }, seed)
    ) as Observable<T[]>;
  }
}
