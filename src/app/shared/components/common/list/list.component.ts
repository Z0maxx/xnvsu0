import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export abstract class ListComponent<T extends TableModel> {
  @Input() items$!: Observable<T[]>;

  @Output() deleteItem = new EventEmitter<T>();

  protected readonly abstract displayedColumns: string[];

  protected deleteItemClick(item: T) {
    this.deleteItem.emit(item);
  }
}
