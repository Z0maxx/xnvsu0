import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LoginService } from './core/services/features/login.service';
import { PermissionsService } from './core/services/permissions.service';
import { OrderComponent } from './features/order/order.component';

const canMatchAdmin: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canMatch(inject(LoginService).userId);
  };

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'eventtypes',
    loadChildren: () => import('./features/eventtype/eventtype.module').then((m) => m.EventtypeModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./features/job/job.module').then((m) => m.JobModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'fixed-wage-employees',
    loadChildren: () => import('./features/fixed-wage-employee/fixed-wage-employee.module').then((m) => m.FixedWageEmployeeModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'fixed-wage-orders',
    loadChildren: () => import('./features/fixed-wage-order/fixed-wage-order.module').then((m) => m.FixedWageOrderModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'hourly-wage-employees',
    loadChildren: () => import('./features/hourly-wage-employee/hourly-wage-employee.module').then((m) => m.HourlyWageEmployeeModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'hourly-wage-orders',
    loadChildren: () => import('./features/hourly-wage-order/hourly-wage-order.module').then((m) => m.HourlyWageOrderModule),
    canMatch: [canMatchAdmin]
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then((m) => m.StatsModule),
    canMatch: [canMatchAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
