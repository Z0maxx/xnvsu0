import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/common/list/list.component';
import { Job } from 'src/app/shared/models/table-models/job';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent extends ListComponent<Job> {
  protected override readonly displayedColumns = ['id', 'name', 'employees', 'update', 'delete']
}
