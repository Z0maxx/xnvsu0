import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, merge, of, scan, shareReplay, throwError } from 'rxjs';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { LiveDB } from 'src/app/shared/interfaces/live-db';
import { SignalrService } from './signalr.service';
import { SnackbarCallerService } from './snackbar-caller.service';
import { Updated } from 'src/app/shared/models/change-models/updated';
import { Deleted } from 'src/app/shared/models/change-models/deleted';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends TableModel> implements LiveDB {
  constructor(
    protected http: HttpClient,
    protected snackbarCaller: SnackbarCallerService,
    protected hubService: SignalrService,
    @Inject('model') private _model: string,
    @Inject('modelName') private _modelName: string
  ) {
    this.ping();

    this.hubService.hubConnection.on(`${this.model}Created`, (id) => {
      if (this._sendInfo) {
        this.http.get<T>(`/api/${this.model}/${id}`).subscribe((item) => {
          this.createdChange$.next(item as T);
        });
      }
    });

    this.hubService.hubConnection.on(`${this.model}sCreated`, (ids: number[]) => {
      if (this._sendInfo) {
        this.getBulk(ids).subscribe((items) => {
          this.createdChanges$.next(items);
        });
      }
    });

    this.hubService.hubConnection.on(`${this.model}Updated`, (item: T) => {
      this.updatedChange$.next({ updatedId: item.id, updatedItem: item });
      if (this.currentId == item.id) {
        this.updateChangeForId.next({ updatedId: item.id, updatedItem: item });
      }
    });

    this.hubService.hubConnection.on(`${this.model}sUpdated`, (items: T[]) => {
      if (this._sendInfo) {
        const updates = items.map(item => { return { updatedId: item.id, updatedItem: item } })
        this.updatedChanges$.next(updates);
        const found = updates.find(u => u.updatedId == this.currentId);
        if (found) {
          this.updateChangeForId.next(found);
        }
      }
    });

    this.hubService.hubConnection.on(`${this.model}Deleted`, (item) => {
      console.log(this._sendInfo)
      console.log(this.currentId)
      console.log(item.id)
      console.log(this.currentId == item.id)
      if (this._sendInfo) {
        this.deletedChange$.next({ deletedId: item.id, deletedItem: item });
        if (this.currentId == item.id) {
          this.deletedChangeForId$.next({ deletedId: item.id, deletedItem: item });
        }
      }
    });
  }

  private readonly defaultError = 'There was an error while trying to connect to the endpoint';
  private _error = false;

  private readonly createdChange$ = new Subject<T>;
  private readonly createdChanges$ = new Subject<T[]>;
  private readonly updatedChange$ = new Subject<Updated<T>>;
  private readonly updateChangeForId = new Subject<Updated<T>>;
  private readonly updatedChanges$ = new Subject<Updated<T>[]>;
  private readonly deletedChange$ = new Subject<Deleted<T>>;
  private readonly deletedChangeForId$ = new Subject<Deleted<T>>;

  private readonly created$ = this.createdChange$.asObservable();
  private readonly createdBulk$ = this.createdChanges$.asObservable();
  private readonly updated$ = this.updatedChange$.asObservable();
  private readonly updatedForId$ = this.updateChangeForId.asObservable();
  private readonly updatedBulk$ = this.updatedChanges$.asObservable();
  private readonly deleted$ = this.deletedChange$.asObservable();
  private readonly deletedForId$ = this.deletedChangeForId$.asObservable();

  protected _sendInfo = false;
  protected currentId!: string | null;

  get error() {
    return this._error;
  }
  get modelName() {
    return this._modelName
  }
  get model() {
    return this._model;
  }
  get created() {
    return this.created$;
  }
  get createdBulk() {
    return this.createdBulk$;
  }
  get updated() {
    return this.updated$;
  }
  get updatedForId() {
    return this.updatedForId$;
  }
  get updatedBulk() {
    return this.updatedBulk$;
  }
  get deleted() {
    return this.deleted$;
  }
  get deletedForId() {
    return this.deletedForId$;
  }

  get(id: string, alert = false) {
    this._error = false;
    this.currentId = id;
    this._sendInfo = true;

    return merge(this.http.get<T>(`/api/${this.model}/${id}`), this.updatedForId$, this.deletedForId$).pipe(
      map(value => {
        const updated = value as Updated<T>;
        const deleted = value as Deleted<T>;
        
        if (updated.updatedId == id) {
          return updated.updatedItem;
        }
        else if (deleted.deletedId == id) {
          this._error = true;
          if (alert) {
            this.snackbarCaller.alert(`This ${this._modelName} got deleted`);
          }
          return { id: null } as unknown as T;
        }
        return value as T
      }),
      shareReplay(1),
      catchError(err => {
        this._error = true;
        this.snackbarCaller.failure(err.error?.msg ?? this.defaultError);
        return of({ id: null });
      })
    ) as Observable<T>;
  }

  getAll() {
    this._error = false;
    this._sendInfo = true;
    let seed: any[] = [];

    return merge(this.http.get<T[]>(`/api/${this.model}`), this.created$, this.createdBulk$, this.updated$, this.updatedBulk$, this.deleted$).pipe(
      scan((acc: any[], value: any) => {
        const updated = value as Updated<T>;
        const deleted = value as Deleted<T>;
        const updatedBulk = value as Updated<T>[];

        if (deleted.deletedId) {
          const idx = acc.findIndex((v: T) => v.id == deleted.deletedId);
          acc.splice(idx, 1);
          return acc;
        }
        else if (updated.updatedId) {
          const idx = acc.findIndex((v: T) => v.id == updated.updatedId);
          acc.splice(idx, 1);
          acc.splice(idx, 0, updated.updatedItem);
          return acc
        }
        else if (updatedBulk.length > 0 && updatedBulk[0].updatedId) {
          for (const updated of updatedBulk) {
            const idx = acc.findIndex((v: T) => v.id == updated.updatedId);
            acc.splice(idx, 1);
            acc.splice(idx, 0, updated.updatedItem);
          }
          return acc;
        }
        else {
          return acc.concat(value);
        }
      }, seed),
      shareReplay(1),
      catchError(err => {
        this._error = true;
        this.snackbarCaller.failure(err.error?.msg ?? this.defaultError);
        return of([]);
      })
    ) as Observable<T[]>;
  }

  getBulk(ids: number[]) {
    return this.http.post<T[]>(`/api/${this.model}/getbulk`, ids);
  }

  delete(id: string) {
    return this.http.delete(`/api/${this.model}/${id}`).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error?.msg ?? this.defaultError));
      })
    )
  }

  update(tableModel: T) {
    return this.http.put(`/api/${this.model}`, tableModel).pipe(
      catchError((err) => {
        return throwError(() => new Error(err.error?.msg ?? this.defaultError));
      })
    )
  }

  updateBulk(tableModels: T[]) {
    return this.http.put(`/api/${this.model}/bulk`, tableModels).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error?.msg ?? this.defaultError));
      })
    )
  }

  create(tableModel: T) {
    return this.http.post(`/api/${this.model}`, tableModel).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error?.msg ?? this.defaultError));
      })
    );
  }

  createBulk(tableModels: TableModel[]) {
    return this.http.post(`/api/${this.model}/bulk`, tableModels).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error?.msg ?? this.defaultError));
      })
    )
  }

  unsubscribe() {
    this._sendInfo = false;
    this.currentId = null;
  }

  private ping() {
    this._error = false;
    this.http.get('/api', { responseType: 'text' }).pipe(
      catchError(() => {
        this._error = true;
        this.snackbarCaller.failure(this.defaultError);
        return of([]);
      })
    ).subscribe();
  }
}
