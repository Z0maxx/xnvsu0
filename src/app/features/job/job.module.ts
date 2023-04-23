import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { JobListComponent } from './job-list/job-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { JobEmployeesComponent } from './job-employees/job-employees.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobSingleComponent } from './job-single/job-single.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';


@NgModule({
  declarations: [
    JobComponent,
    JobEmployeesComponent,
    JobListComponent,
    JobCreateComponent,
    JobUpdateComponent,
    JobSingleComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    LoadingModule
  ]
})
export class JobModule { }
