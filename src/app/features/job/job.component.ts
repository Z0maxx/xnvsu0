import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { Job } from 'src/app/shared/models/table-models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent extends TableModelComponent<Job> {
  constructor(
    service: JobService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService
  ) {
    super(dialog, snackbarCaller, service);
  }
}
