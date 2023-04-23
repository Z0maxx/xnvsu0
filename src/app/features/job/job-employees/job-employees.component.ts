import { Component } from '@angular/core';
import { InnerListComponent } from 'src/app/shared/components/common/inner-list/inner-list.component';
import { Job } from 'src/app/shared/models/table-models/job';

@Component({
  selector: 'app-job-employees',
  templateUrl: './job-employees.component.html',
  styleUrls: ['./job-employees.component.css']
})
export class JobEmployeesComponent extends InnerListComponent<Job> {
  protected override readonly displayedColumns = ['id', 'hireDate', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'details'];
}
