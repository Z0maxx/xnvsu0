import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from 'src/app/shared/models/table-models/job';
import { CrudService } from '../../../crud.service';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';

@Injectable({
  providedIn: 'root'
})
export class JobService extends CrudService<Job> {
  constructor(
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(http, snackbarCaller, hubService, 'job', 'Job');
  }
}
