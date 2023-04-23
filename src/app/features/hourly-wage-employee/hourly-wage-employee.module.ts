import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourlyWageEmployeeRoutingModule } from './hourly-wage-employee-routing.module';
import { HourlyWageEmployeeComponent } from './hourly-wage-employee.component';
import { HourlyWageEmployeeListComponent } from './hourly-wage-employee-list/hourly-wage-employee-list.component';
import { HourlyWageEmployeeCreateComponent } from './hourly-wage-employee-create/hourly-wage-employee-create.component';
import { HourlyWageEmployeeUpdateComponent } from './hourly-wage-employee-update/hourly-wage-employee-update.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HourlyWageEmployeeSingleComponent } from './hourly-wage-employee-single/hourly-wage-employee-single.component';
import { HourlyWageEmployeeOrdersComponent } from './hourly-wage-employee-orders/hourly-wage-employee-orders.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  declarations: [
    HourlyWageEmployeeComponent,
    HourlyWageEmployeeListComponent,
    HourlyWageEmployeeCreateComponent,
    HourlyWageEmployeeUpdateComponent,
    HourlyWageEmployeeSingleComponent,
    HourlyWageEmployeeOrdersComponent
  ],
  imports: [
    CommonModule,
    HourlyWageEmployeeRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoadingModule
  ]
})
export class HourlyWageEmployeeModule { }
