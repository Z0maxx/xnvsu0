import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedWageOrderRoutingModule } from './fixed-wage-order-routing.module';
import { FixedWageOrderComponent } from './fixed-wage-order.component';
import { FixedWageOrderListComponent } from './fixed-wage-order-list/fixed-wage-order-list.component';
import { FixedWageOrderUpdateComponent } from './fixed-wage-order-update/fixed-wage-order-update.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FixedWageOrderSingleComponent } from './fixed-wage-order-single/fixed-wage-order-single.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  declarations: [
    FixedWageOrderComponent,
    FixedWageOrderListComponent,
    FixedWageOrderUpdateComponent,
    FixedWageOrderSingleComponent,
  ],
  imports: [
    CommonModule,
    FixedWageOrderRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoadingModule
  ]
})

export class FixedWageOrderModule { }
