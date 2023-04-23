import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedWageEmployeeRoutingModule } from './fixed-wage-employee-routing.module';
import { FixedWageEmployeeComponent } from './fixed-wage-employee.component';
import { FixedWageEmployeeListComponent } from './fixed-wage-employee-list/fixed-wage-employee-list.component';
import { FixedWageEmployeeCreateComponent } from './fixed-wage-employee-create/fixed-wage-employee-create.component';
import { FixedWageEmployeeUpdateComponent } from './fixed-wage-employee-update/fixed-wage-employee-update.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FixedWageEmployeeSingleComponent } from './fixed-wage-employee-single/fixed-wage-employee-single.component';
import { FixedWageEmployeeOrdersComponent } from './fixed-wage-employee-orders/fixed-wage-employee-orders.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';


@NgModule({
  declarations: [
    FixedWageEmployeeComponent,
    FixedWageEmployeeListComponent,
    FixedWageEmployeeCreateComponent,
    FixedWageEmployeeUpdateComponent,
    FixedWageEmployeeSingleComponent,
    FixedWageEmployeeOrdersComponent
  ],
  imports: [
    CommonModule,
    FixedWageEmployeeRoutingModule,
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
export class FixedWageEmployeeModule { }
