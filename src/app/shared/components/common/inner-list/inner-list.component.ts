import { Component } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inner-list',
  templateUrl: './inner-list.component.html',
  styleUrls: ['./inner-list.component.css']
})
export abstract class InnerListComponent<T extends TableModel> extends BaseComponent<T> {
  constructor(
    service: CrudService<T>,
    private route: ActivatedRoute
  ) {
    super(service);
  }

  private readonly id = this.route.snapshot.paramMap.get('id');

  protected readonly abstract displayedColumns: string[];
  protected readonly item$ = this.service.get(this.id ?? '0');
}
