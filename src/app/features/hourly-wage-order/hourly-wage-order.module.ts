import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { HourlyWageOrderListComponent } from './hourly-wage-order-list/hourly-wage-order-list.component';
import { HourlyWageOrderRoutingModule } from './hourly-wage-order-routing.module';
import { HourlyWageOrderSingleComponent } from './hourly-wage-order-single/hourly-wage-order-single.component';
import { HourlyWageOrderUpdateComponent } from './hourly-wage-order-update/hourly-wage-order-update.component';
import { HourlyWageOrderComponent } from './hourly-wage-order.component';

@NgModule({
  declarations: [
    HourlyWageOrderComponent,
    HourlyWageOrderListComponent,
    HourlyWageOrderUpdateComponent,
    HourlyWageOrderSingleComponent,
  ],
  imports: [
    CommonModule,
    HourlyWageOrderRoutingModule,
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

export class HourlyWageOrderModule { }
