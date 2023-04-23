import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { TableModelComponent } from 'src/app/shared/components/common/table-model/table-model.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';

@Component({
  selector: 'app-eventtype',
  templateUrl: './eventtype.component.html',
  styleUrls: ['./eventtype.component.css']
})
export class EventtypeComponent extends TableModelComponent<Eventtype> {
  constructor(
    service: EventtypeService,
    dialog: MatDialog,
    snackbarCaller: SnackbarCallerService,
  ) {
    super(dialog, snackbarCaller, service);
  }
}
