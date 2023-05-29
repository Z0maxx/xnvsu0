import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, merge, scan } from 'rxjs';
import { Deleted } from 'src/app/shared/models/change-models/deleted';
import { Updated } from 'src/app/shared/models/change-models/updated';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { FixedWageOrder } from 'src/app/shared/models/table-models/fixed-wage-order';
import { Order } from 'src/app/shared/models/table-models/generic-models/order';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { HourlyWageOrder } from 'src/app/shared/models/table-models/hourly-wage-order';
import { EmployeeService } from './employee.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';

@Injectable({
  providedIn: 'root'
})
export abstract class OrderService<T extends FixedWageOrder | HourlyWageOrder, S extends FixedWageEmployee | HourlyWageEmployee> extends CrudService<T> {
  constructor(
    private employeeService: EmployeeService<S>,
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService,
    @Inject('model') model: string
  ) {
    super(http, snackbarCaller, hubService, model, 'Order');

    this.employeeService.created.subscribe((created) => {
      this.availableCreatedChange$.next(created);
    });

    this.employeeService.deleted.subscribe((deleted) => {
      if (this.order && deleted.deletedId != this.order.employeeId)
      {
        this.availableDeletedChange$.next(deleted);
      }
    });

    this.updated.subscribe((updated) => {
      const updatedItem = updated.updatedItem;
      if (updatedItem.id != this.currentId) {
        if (
          updatedItem.orderDate == this.order.orderDate &&
          updatedItem.firstName == this.order.firstName &&
          updatedItem.lastName == this.order.lastName &&
          updatedItem.emailAddress == this.order.emailAddress
        ) {
          const employee = updatedItem.employee as S;
          this.availableRemovedChange$.next({ deletedId: employee.id, deletedItem: employee });
        }
      }
    });

    this.hubService.hubConnection.on(`${model}groupupdated`, (ids: number[], oldEmployeeId: number) => {
      if (ids.includes(parseInt(this.currentId as string))) {
        this.http.get<S>(`/api/${this.employeeService.model}/${oldEmployeeId}`).subscribe((employee) => {
          this.availableCreatedChange$.next(employee);
        })
      }
    })
  }

  private order!: Order;
  private readonly availableCreatedChange$ = new Subject<S>;
  private readonly availableDeletedChange$ = new Subject<Deleted<S>>;
  private readonly availableRemovedChange$ = new Subject<Deleted<S>>;

  private readonly availableCreated$ = this.availableCreatedChange$.asObservable();
  private readonly availableDeleted$ = this.availableDeletedChange$.asObservable();
  private readonly availableRemoved$ = this.availableRemovedChange$.asObservable();

  get availableCreated() {
    return this.availableCreated$;
  }
  get availableDeleted() {
    return this.availableDeleted$;
  }
  get availableRemoved() {
    return this.availableRemoved$;
  }

  getAllForCustomer(order: Order) {
    const genericOrder: Order = {
      id: order.id,
      orderDate: order.orderDate,
      firstName: order.firstName,
      lastName: order.lastName,
      phoneNumber: order.phoneNumber,
      employeeId: order.employeeId ?? '0',
      emailAddress: order.emailAddress
    }

    return this.http.post<T[]>(`/api/${this.model}/allforcustomer`, genericOrder);
  }

  getAvailableEmployeesForOrder(order: T) {
    this.order = {
      id: order.id,
      orderDate: order.orderDate,
      firstName: order.firstName,
      lastName: order.lastName,
      phoneNumber: order.phoneNumber,
      employeeId: order.employeeId ?? '0',
      emailAddress: order.emailAddress
    }

    let seed: any[] = [];
    return merge(
      this.http.post<S[]>(`/api/${this.model}/availableemployeesfororder`, this.order),
      this.availableCreated$,
      this.availableDeleted$,
      this.availableRemoved$
    ).pipe(
      scan((acc: any[], value: any) => {
        const deleted = value as Deleted<S>;
        const updated = value as Updated<S>;

        if (deleted.deletedId) {
          const idx = acc.findIndex((v: S) => v.id == deleted.deletedId)
          if (idx > -1) acc.splice(idx, 1);
          return acc;
        }
        else if (updated.updatedId) {
          const idx = acc.findIndex((v: S) => v.id == updated.updatedId);
          if (idx > -1) {
            acc.splice(idx, 1);
            acc.splice(idx, 0, updated.updatedItem);
          }
          return acc;
        }
        else {
          return acc.concat(value);
        }
      }, seed)
    ) as Observable<S[]>;
  }
}
