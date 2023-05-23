import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { IncomeFromEventByJobsComponent } from './income-from-event-by-jobs/income-from-event-by-jobs.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrdersCountByJobComponent } from './orders-count-by-job/orders-count-by-job.component';
import { MatListModule } from '@angular/material/list';
import { MostPopularFixedWageEmployeesComponent } from './most-popular-fixed-wage-employees/most-popular-fixed-wage-employees.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HourlyWageEmployeesAverageHoursComponent } from './hourly-wage-employees-average-hours/hourly-wage-employees-average-hours.component';
import { HourlyWageOrdersOverviewComponent } from './hourly-wage-orders-overview/hourly-wage-orders-overview.component';
import { OverallOverviewComponent } from './overall-overview/overall-overview.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  declarations: [
    StatsComponent,
    IncomeFromEventByJobsComponent,
    OrdersCountByJobComponent,
    MostPopularFixedWageEmployeesComponent,
    HourlyWageEmployeesAverageHoursComponent,
    HourlyWageOrdersOverviewComponent,
    OverallOverviewComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MatProgressSpinnerModule,
    LoadingModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class StatsModule { }
