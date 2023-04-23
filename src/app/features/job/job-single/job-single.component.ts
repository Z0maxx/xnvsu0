import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Job } from 'src/app/shared/models/table-models/job';


@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent extends SingleComponent<Job> {
  constructor(
    service: JobService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'jobs', service);
  }
  
  protected override readonly displayedColumns = ['id', 'name', 'employees', 'update', 'delete'];
}
