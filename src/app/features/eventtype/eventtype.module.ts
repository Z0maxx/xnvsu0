import { InjectionToken, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventtypeRoutingModule } from './eventtype-routing.module';
import { EventtypeComponent } from './eventtype.component';
import { EventtypeListComponent } from './eventtype-list/eventtype-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EventtypeOrdersComponent } from './eventtype-orders/eventtype-orders.component';
import { EventtypeUpdateComponent } from './eventtype-update/eventtype-update.component';
import { EventtypeCreateComponent } from './eventtype-create/eventtype-create.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventtypeSingleComponent } from './eventtype-single/eventtype-single.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  declarations: [
    EventtypeComponent,
    EventtypeListComponent,
    EventtypeOrdersComponent,
    EventtypeUpdateComponent,
    EventtypeCreateComponent,
    EventtypeSingleComponent
  ],
  imports: [
    CommonModule,
    EventtypeRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoadingModule
  ]
})
export class EventtypeModule { }

