import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { InnerListComponent } from 'src/app/shared/components/common/inner-list/inner-list.component';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';

@Component({
  selector: 'app-eventtype-orders',
  templateUrl: './eventtype-orders.component.html',
  styleUrls: ['./eventtype-orders.component.css']
})
export class EventtypeOrdersComponent extends InnerListComponent<Eventtype> {
  constructor(
    route: ActivatedRoute,
    service: EventtypeService,
  ) {
    super(service, route);
  }

  protected override readonly displayedColumns = ['id', 'orderDate', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'details'];
}
