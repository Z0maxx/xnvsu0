import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';


@Component({
  selector: 'app-eventtype-list',
  templateUrl: './eventtype-list.component.html',
  styleUrls: ['./eventtype-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventtypeListComponent extends ListComponent<Eventtype> {
  protected override readonly displayedColumns = ['id', 'name', 'details', 'update', 'delete'];
}
