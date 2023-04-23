import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedWageEmployeeCreateComponent } from './fixed-wage-employee-create/fixed-wage-employee-create.component';
import { FixedWageEmployeeOrdersComponent } from './fixed-wage-employee-orders/fixed-wage-employee-orders.component';
import { FixedWageEmployeeSingleComponent } from './fixed-wage-employee-single/fixed-wage-employee-single.component';
import { FixedWageEmployeeUpdateComponent } from './fixed-wage-employee-update/fixed-wage-employee-update.component';
import { FixedWageEmployeeComponent } from './fixed-wage-employee.component';

const routes: Routes = [
  {
    path: '',
    component: FixedWageEmployeeComponent
  },
  {
    path: 'add-new',
    component: FixedWageEmployeeCreateComponent
  },
  {
    path: ':id',
    component: FixedWageEmployeeSingleComponent
  },
  {
    path: ':id/update',
    component: FixedWageEmployeeUpdateComponent
  },
  {
    path: ':id/orders',
    component: FixedWageEmployeeOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedWageEmployeeRoutingModule { }
