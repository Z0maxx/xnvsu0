import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';
import { CrudService } from '../../../crud.service';
import { SignalrService } from '../../../signalr.service';
import { SnackbarCallerService } from '../../../snackbar-caller.service';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService extends CrudService<Eventtype> {
  constructor(
    http: HttpClient,
    snackbarCaller: SnackbarCallerService,
    hubService: SignalrService
  ) {
    super(http, snackbarCaller, hubService, 'eventtype', 'Event type');
  }
}

