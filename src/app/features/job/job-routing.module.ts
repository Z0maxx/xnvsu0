import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobEmployeesComponent } from './job-employees/job-employees.component';
import { JobSingleComponent } from './job-single/job-single.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobComponent } from './job.component';

const routes: Routes = [
  {
    path: '',
    component: JobComponent
  },
  {
    path: 'add-new',
    component: JobCreateComponent
  },
  {
    path: ':id',
    component: JobSingleComponent
  },
  {
    path: ':id/update',
    component: JobUpdateComponent
  },
  {
    path: ':id/employees',
    component: JobEmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
