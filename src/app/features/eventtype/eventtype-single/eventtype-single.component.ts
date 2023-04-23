import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { SingleComponent } from 'src/app/shared/components/common/single/single.component';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';

@Component({
  selector: 'app-eventtype-single',
  templateUrl: './eventtype-single.component.html',
  styleUrls: ['./eventtype-single.component.css']
})
export class EventtypeSingleComponent extends SingleComponent<Eventtype> {
  constructor(
    service: EventtypeService,
    snackbarCaller: SnackbarCallerService,
    router: Router,
    route: ActivatedRoute,
    dialog: MatDialog
  ) {
    super(snackbarCaller, router, dialog, route, 'eventtypes', service)
  }

  protected override readonly displayedColumns = ['id', 'name', 'orders', 'update', 'delete'];
}
