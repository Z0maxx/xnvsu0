import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export abstract class BaseComponent<T extends TableModel> implements OnDestroy {
  constructor(
    protected service: CrudService<T>
    ) { }

  protected readonly unsubscribe = new Subject<void>();

  protected get error() {
    return this.service.error;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.service.unsubscribe();
  }
}
