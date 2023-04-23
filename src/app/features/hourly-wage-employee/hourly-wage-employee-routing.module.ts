import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyWageEmployeeCreateComponent } from './hourly-wage-employee-create/hourly-wage-employee-create.component';
import { HourlyWageEmployeeOrdersComponent } from './hourly-wage-employee-orders/hourly-wage-employee-orders.component';
import { HourlyWageEmployeeSingleComponent } from './hourly-wage-employee-single/hourly-wage-employee-single.component';
import { HourlyWageEmployeeUpdateComponent } from './hourly-wage-employee-update/hourly-wage-employee-update.component';
import { HourlyWageEmployeeComponent } from './hourly-wage-employee.component';

const routes: Routes = [
  {
    path: '',
    component: HourlyWageEmployeeComponent
  },
  {
    path: 'add-new',
    component: HourlyWageEmployeeCreateComponent
  },
  {
    path: ':id',
    component: HourlyWageEmployeeSingleComponent
  },
  {
    path: ':id/update',
    component: HourlyWageEmployeeUpdateComponent
  },
  {
    path: ':id/orders',
    component: HourlyWageEmployeeOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlyWageEmployeeRoutingModule { }
