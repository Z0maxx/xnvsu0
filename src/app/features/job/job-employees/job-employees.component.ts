import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { InnerListComponent } from 'src/app/shared/components/common/inner-list/inner-list.component';
import { Job } from 'src/app/shared/models/table-models/job';

@Component({
  selector: 'app-job-employees',
  templateUrl: './job-employees.component.html',
  styleUrls: ['./job-employees.component.css']
})
export class JobEmployeesComponent extends InnerListComponent<Job> {
  constructor(
    service: JobService,
    route: ActivatedRoute
  ) {
    super(service, route);
  }
  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'details'];
}
