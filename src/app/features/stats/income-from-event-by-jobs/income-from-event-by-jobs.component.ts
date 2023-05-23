import { Component, Input } from '@angular/core';
import { IncomeFromJob } from 'src/app/shared/models/stat-models/income-from-job';

@Component({
  selector: 'app-income-from-event-by-jobs',
  templateUrl: './income-from-event-by-jobs.component.html',
  styleUrls: ['./income-from-event-by-jobs.component.css']
})
export class IncomeFromEventByJobsComponent {
  @Input() incomeFromJobs: IncomeFromJob[] = [];

  displayedColumns = ['job', 'income'];
}
