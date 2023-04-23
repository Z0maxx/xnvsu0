import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventtypeCreateComponent } from './eventtype-create/eventtype-create.component';
import { EventtypeOrdersComponent } from './eventtype-orders/eventtype-orders.component';
import { EventtypeSingleComponent } from './eventtype-single/eventtype-single.component';
import { EventtypeUpdateComponent } from './eventtype-update/eventtype-update.component';
import { EventtypeComponent } from './eventtype.component';

const routes: Routes = [
  {
    path: '',
    component: EventtypeComponent
  },
  {
    path: 'add-new',
    component: EventtypeCreateComponent
  },
  {
    path: ':id',
    component: EventtypeSingleComponent
  },
  {
    path: ':id/update',
    component: EventtypeUpdateComponent
  },
  {
    path: ':id/orders',
    component: EventtypeOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventtypeRoutingModule { }
