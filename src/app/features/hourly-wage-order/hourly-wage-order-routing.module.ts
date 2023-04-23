import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyWageOrderSingleComponent } from './hourly-wage-order-single/hourly-wage-order-single.component';
import { HourlyWageOrderUpdateComponent } from './hourly-wage-order-update/hourly-wage-order-update.component';
import { HourlyWageOrderComponent } from './hourly-wage-order.component';

const routes: Routes = [
  {
    path: '',
    component: HourlyWageOrderComponent
  },
  {
    path: ':id',
    component: HourlyWageOrderSingleComponent
  },
  {
    path: ':id/update',
    component: HourlyWageOrderUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlyWageOrderRoutingModule { }
