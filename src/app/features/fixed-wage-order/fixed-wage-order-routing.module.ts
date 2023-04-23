import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedWageOrderSingleComponent } from './fixed-wage-order-single/fixed-wage-order-single.component';
import { FixedWageOrderUpdateComponent } from './fixed-wage-order-update/fixed-wage-order-update.component';
import { FixedWageOrderComponent } from './fixed-wage-order.component';

const routes: Routes = [
  {
    path: '',
    component: FixedWageOrderComponent
  },
  {
    path: ':id',
    component: FixedWageOrderSingleComponent
  },
  {
    path: ':id/update',
    component: FixedWageOrderUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedWageOrderRoutingModule { }
