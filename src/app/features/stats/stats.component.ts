import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatsService } from 'src/app/core/services/features/models/stats/stats.service';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { EmployeeAverageHours } from 'src/app/shared/models/stat-models/employee-average-hours';
import { EmployeeOrdersCount } from 'src/app/shared/models/stat-models/employee-orders-count';
import { IncomeFromJob } from 'src/app/shared/models/stat-models/income-from-job';
import { IncomeFromOrder } from 'src/app/shared/models/stat-models/income-from-order';
import { OrdersCount } from 'src/app/shared/models/stat-models/orders-count';
import { Overview } from 'src/app/shared/models/stat-models/overview';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  constructor(
    public service: StatsService,
    private eventtypeService: EventtypeService,
    private jobService: JobService,
    private formBuilder: FormBuilder
  ) {}

  get error() {
    return this.service.error;
  }

  eventtypeId!: number;
  eventtypes$ = this.eventtypeService.getAll();
  incomeFromEventByJobs$!: Observable<IncomeFromJob[]>;

  jobId!: string;
  jobs$ = this.jobService.getAll();
  ordersCountByJob$!: Observable<OrdersCount>;

  mostPopularFixedWageEmployees$!: Observable<EmployeeOrdersCount[]>;

  incomeFromFixedWageOrdersForm!: FormGroup;
  incomeFromFixedWageOrders$!: Observable<number>;

  hourlyWageEmployeesAverageHours$!: Observable<EmployeeAverageHours[]>;

  hourlyWageOrdersOverview$!: Observable<IncomeFromOrder[]>;

  overallOverview$!: Observable<Overview>;

  setIncomeFromEventByJobs() {
    this.incomeFromEventByJobs$ = this.service.incomeFromEventByJobs(this.eventtypeId);
  }

  setOrdersCountByJob() {
    this.ordersCountByJob$ = this.service.ordersCountByJob(this.jobId);
  }

  setMostPopularFixedWageEmployees() {
    this.mostPopularFixedWageEmployees$ = this.service.mostPopularFixedWageEmployees();
  }

  setIncomeFromFixedWageOrdersInYear() {
    const year = this.incomeFromFixedWageOrdersForm.controls['year'].value;
    this.incomeFromFixedWageOrders$ = this.service.incomeFromFixedWageOrdersInYear(year);
  }

  setHourlyWageEmployeesAverageHours() {
    this.hourlyWageEmployeesAverageHours$ = this.service.hourlyWageEmployeesAverageHours();
  }

  setHourlyWageOrdersOverview() {
    this.hourlyWageOrdersOverview$ = this.service.hourlyWageOrdersOverview();
  }

  setOverallOverview() {
    this.overallOverview$ = this.service.overallOverview();
  }

  ngOnInit() {
    this.incomeFromFixedWageOrdersForm = this.formBuilder.group({
      year: new FormControl(
        null,
        {
          validators: [
            Validators.required
          ]
        }
      )
    });
  }
}
