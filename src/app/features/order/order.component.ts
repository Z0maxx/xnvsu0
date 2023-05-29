import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EventtypeService } from 'src/app/core/services/features/models/table/eventtype.service';
import { FixedWageEmployeeService } from 'src/app/core/services/features/models/table/fixed-wage-employee.service';
import { HourlyWageEmployeeService } from 'src/app/core/services/features/models/table/hourly-wage-employee.service';
import { JobService } from 'src/app/core/services/features/models/table/job.service';
import { CreateOrderService } from 'src/app/core/services/features/create-order.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';
import { Eventtype } from 'src/app/shared/models/table-models/eventtype';
import { FixedWageEmployee } from 'src/app/shared/models/table-models/fixed-wage-employee';
import { HourlyWageEmployee } from 'src/app/shared/models/table-models/hourly-wage-employee';
import { Job } from 'src/app/shared/models/table-models/job';
import { TimeValidator } from 'src/app/shared/validators/time-validator';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(
    private service: CreateOrderService,
    private eventtypeService: EventtypeService,
    private jobService: JobService,
    private fixedEmployeeService: FixedWageEmployeeService,
    private hourlyEmployeeService: HourlyWageEmployeeService,
    private formBuilder: FormBuilder,
    private snackbarCaller: SnackbarCallerService
  ) { }

  private readonly unsubscribe = new Subject<void>();
  private hoursList: number[] = [];

  protected createForm!: FormGroup;
  protected jobName!: string | undefined;
  protected hourlyEmployee!: HourlyWageEmployee | undefined;

  protected fixedEmployees!: FixedWageEmployee[];
  protected hourlyEmployees!: HourlyWageEmployee[];
  protected eventtypes!: Eventtype[];
  protected jobs!: Job[];

  protected addedFixedEmployees: FixedWageEmployee[] = [];
  protected addedHourlyEmployees: HourlyWageEmployee[] = [];

  protected creating = false;
  protected updatingFixed = false;
  protected updatingHourly = false;
  protected minDate = TimeValidator.getMinDate();
  protected orderType = '';

  protected get error() {
    return this.service.error;
  }
  get orderFixedEmployees() {
    return (this.createForm.controls['orderEmployees'] as FormGroup).controls['orderFixedEmployees'] as FormArray;
  }
  get orderHourlyEmployees() {
    return (this.createForm.controls['orderEmployees'] as FormGroup).controls['orderHourlyEmployees'] as FormArray;
  }
  get availableFixedEmployees() {
    const addedEmployeeIds = this.addedFixedEmployees.map(e => e.id);
    return this.fixedEmployees.filter(e => !addedEmployeeIds.includes(e.id))
  }
  get availableHourlyEmployees() {
    const addedEmployeeIds = this.addedHourlyEmployees.map(e => e.id);
    return this.hourlyEmployees.filter(e => !addedEmployeeIds.includes(e.id))
  }
  get addedEmployeesCount() {
    return this.addedFixedEmployees.length + this.addedHourlyEmployees.length;
  }
  get price() {
    let hourlyPrice = 0;
    for (let i = 0; i < this.addedHourlyEmployees.length; i++) {
      hourlyPrice += this.addedHourlyEmployees[i].wage * this.hoursList[i];
    }
    return this.addedFixedEmployees.map(e => e.wage).reduce((pSum, a) => pSum + a, 0) + hourlyPrice;
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: new FormControl(
        null
      ),
      orderDate: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            TimeValidator.minhours(8),
            TimeValidator.maxhours(22),
            TimeValidator.seconds(),
            TimeValidator.minutes()
          ]
        }
      ),
      firstName: new FormControl(
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      lastName: new FormControl(
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      emailAddress: new FormControl(
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.minLength(10),
            Validators.maxLength(30)
          ],
          updateOn: 'blur'
        }
      ),
      phoneNumber: new FormControl(
        '',
        {
          updateOn: 'blur'
        }
      ),
      jobId: new FormControl(
        null,
        {
          validators: [
            Validators.required
          ]
        }
      ),
      employeeId: new FormControl(
        { value: null, disabled: true }
      ),
      orderEmployees: this.formBuilder.group({
        orderFixedEmployees: this.formBuilder.array([]),
        orderHourlyEmployees: this.formBuilder.array([])
      })
    });

    this.fixedEmployeeService.availableUpdated
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((updated) => {
        this.handleFixedEmployeeChange(updated.updatedItem, 'updated', 'update');
      });

    this.fixedEmployeeService.availableDeleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        this.handleFixedEmployeeChange(deleted.deletedItem, 'deleted', 'delete');
      });

    this.fixedEmployeeService.availableRemoved
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((removed) => {
        this.handleFixedEmployeeChange(removed.deletedItem, 'a new order', 'delete');
      });

    this.hourlyEmployeeService.availableUpdated
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((updated) => {
        this.handleHourlyEmployeeChange(updated.updatedItem, 'updated', 'update');
      });

    this.hourlyEmployeeService.availableDeleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        this.handleHourlyEmployeeChange(deleted.deletedItem, 'deleted', 'delete');
      });

    this.hourlyEmployeeService.availableRemoved
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((removed) => {
        this.handleHourlyEmployeeChange(removed.deletedItem, 'a new order', 'delete');
      });

    const eventtypeIdControl = this.createForm.controls['eventTypeId'];
    this.eventtypeService.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        if (eventtypeIdControl.value == deleted.deletedId) {
          this.snackbarCaller.alert(`Selected ${this.eventtypeService.modelName} got deleted`);
          eventtypeIdControl.setValue(null);
        }
      });

    const jobIdControl = this.createForm.controls['jobId'];
    this.jobService.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deleted) => {
        if (jobIdControl.value == deleted.deletedId) {
          this.snackbarCaller.alert(`Selected ${this.jobService.modelName} got deleted`);
          jobIdControl.setValue(null);
        }
      })

    this.createForm.controls['orderDate'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.setEmployees(true);
      });

    jobIdControl.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.setEmployees();
      });

    this.createForm.controls['employeeId'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        const employeeId = this.createForm.controls['employeeId'].value?.split('-');
        if (!employeeId) {
          this.orderType = '';
          this.createForm.removeControl('hours');
          return;
        }

        this.orderType = employeeId[0];
        if (this.orderType == 'fixed') {
          this.createForm.removeControl('hours');
        }

        else if (this.orderType == 'hourly') {
          this.hourlyEmployee = this.hourlyEmployees.find(e => e.id == employeeId[1]);
          if (!this.hourlyEmployee) return;
          this.createForm.setControl('hours', new FormControl(
            null,
            {
              validators: [
                Validators.required,
                Validators.min(this.hourlyEmployee.minHours),
                Validators.max(this.hourlyEmployee.maxHours)
              ]
            }
          ));
        }
      });

    this.eventtypeService.getAll()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.eventtypes = data;
      });

    this.jobService.getAll()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.jobs = data;
      });
  }

  private handleFixedEmployeeChange(changed: FixedWageEmployee, change: string, changeType: string) {
    const idx = this.addedFixedEmployees.findIndex((e) => e.id == changed.id);
    if (idx > -1) {
      this.snackbarCaller.alert(`Added ${this.fixedEmployeeService.modelName} ${changed.firstName} ${changed.lastName} got ${change}`);

      this.addedFixedEmployees.splice(idx, 1);
      if (changeType == 'update') {
        const controls = (this.orderFixedEmployees.at(idx) as FormGroup).controls;
        controls['employee'].setValue(`${changed.firstName} ${changed.lastName}: ${changed.job?.name}`);
        controls['employeePrice'].setValue(`${changed.wage} Ft`);
        controls['employeeHours'].setValue(`${changed.hours} Hours`);
        this.addedFixedEmployees.splice(idx, 0, changed);
      }
      else {
        this.orderFixedEmployees.removeAt(idx);
      }
    }

    this.handleEmployeeChange('fixed-', changed, this.fixedEmployeeService.modelName, change);
  }

  private handleHourlyEmployeeChange(changed: HourlyWageEmployee, change: string, changeType: string) {
    const idx = this.addedHourlyEmployees.findIndex((e) => e.id == changed.id);
    if (idx > -1) {
      this.snackbarCaller.alert(`Added ${this.fixedEmployeeService.modelName} ${changed.firstName} ${changed.lastName} got ${change}`);
      
      this.addedHourlyEmployees.splice(idx, 1);
      if (changeType == 'update' && changed.minHours <= this.hoursList[idx] && changed.maxHours >= this.hoursList[idx]) {
        const controls = (this.orderHourlyEmployees.at(idx) as FormGroup).controls
        controls['employee'].setValue(`${changed.firstName} ${changed.lastName}: ${changed.job?.name}`);
        controls['employeePrice'].setValue(`${changed.wage} Ft/Hour`);
        controls['employeeHours'].setValue(`${this.hoursList[idx]} Hours`);
        this.addedHourlyEmployees.splice(idx, 0, changed);
      }
      else {
        this.orderHourlyEmployees.removeAt(idx);
      }
    }

    this.handleEmployeeChange('hourly-', changed, this.hourlyEmployeeService.modelName, change);
  }

  private handleEmployeeChange(employeeType: string, changed: FixedWageEmployee | HourlyWageEmployee, modelName: string, change: string) {
    if (this.createForm.controls['employeeId'].value == employeeType + changed.id) {
      this.snackbarCaller.alert(`Selected ${modelName} got ${change}`);
    }
  }

  private setEmployees(clearAddedEmployees: boolean = false) {
    const orderDate = this.createForm.controls['orderDate'].value;
    const jobId = this.createForm.controls['jobId'].value;
    if (!orderDate || !jobId) return;

    if (clearAddedEmployees) {
      this.orderFixedEmployees.clear();
      this.orderHourlyEmployees.clear();
      this.addedFixedEmployees = [];
      this.addedHourlyEmployees = [];
    }

    this.createForm.controls['employeeId'].setValue(null);
    this.createForm.removeControl('hours');
    this.orderType = '';

    this.updatingFixed = true;
    this.updatingHourly = true;

    this.fixedEmployeeService.getAvailable(orderDate, jobId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.fixedEmployees = data;
        this.updatingFixed = false;
        this.endSetEmployees();
      });

    this.hourlyEmployeeService.getAvailable(orderDate, jobId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.hourlyEmployees = data;
        this.updatingHourly = false;
        this.endSetEmployees();
      });

    this.jobName = this.jobs.find(j => j.id == jobId)?.name;
  }

  private endSetEmployees() {
    if (this.updatingFixed || this.updatingHourly) return;
    this.createForm.controls['employeeId'].enable()
  }

  private completeFixedOrder() {
    this.createForm.removeControl('eventTypeId');
    this.addedFixedEmployees = [];
    this.complete();
  }

  private completeHourlyOrder() {
    this.addedHourlyEmployees = [];
    this.complete();
  }

  private displayError(err: string) {
    this.snackbarCaller.failure(err);
    this.end();
  }

  private complete() {
    if (this.addedFixedEmployees.length != 0 || this.addedHourlyEmployees.length != 0) return;
    this.snackbarCaller.success('Order submitted successfully');
    this.resetForm();

    this.orderFixedEmployees.clear();
    this.orderHourlyEmployees.clear();
    this.fixedEmployees = [];
    this.hourlyEmployees = [];
    this.jobName = '';
    
    this.end();
  }

  private resetForm() {
    this.createForm.reset({
      orderDate: null,
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      jobId: null,
      employeeId: { value: null, disabled: true }
    });
  }

  private end() {
    this.creating = false;
  }

  protected addEmployee() {
    const employeeId = this.createForm.controls['employeeId'].value?.split('-');
    let employee = employeeId[0] == 'fixed' ?
      this.fixedEmployees.find(e => e.id == employeeId[1]) :
      this.hourlyEmployees.find(e => e.id == employeeId[1]);

    if (!employeeId || !employee) return;

    if (employeeId[0] == 'fixed') {
      employee = employee as FixedWageEmployee;

      this.addedFixedEmployees.push(employee);
      this.orderFixedEmployees.push(

        this.formBuilder.group({
          employee: new FormControl(
            `${employee.firstName} ${employee.lastName}: ${employee.job?.name}`
          ),
          employeePrice: new FormControl(
            `${employee.wage} Ft`
          ),
          employeeHours: new FormControl(
            `${employee.hours} Hours`
          )
        })
      )

      if (!this.createForm.get('eventTypeId')) {
        this.createForm.setControl('eventTypeId', new FormControl(
          null,
          {
            validators: [
              Validators.required
            ]
          }
        ));
      }

      this.createForm.removeControl('hours');
    }

    else if (employeeId[0] == 'hourly') {
      const hours = this.createForm.controls['hours'].value

      this.hoursList.push(hours);
      this.addedHourlyEmployees.push(employee as HourlyWageEmployee);
      this.orderHourlyEmployees.push(
        this.formBuilder.group({
          employee: new FormControl(
            `${employee.firstName} ${employee.lastName}: ${employee.job?.name}`
          ),
          employeePrice: new FormControl(
            `${employee.wage} Ft/Hour`
          ),
          employeeHours: new FormControl(
            `${hours} Hours`
          )
        })
      )
    }

    this.orderType = '';
    this.createForm.controls['employeeId'].setValue(null);
  }

  protected removeFixedEmployee(index: number) {
    this.addedFixedEmployees.splice(index, 1);
    this.orderFixedEmployees.removeAt(index);
    if (this.addedFixedEmployees.length == 0) {
      this.createForm.removeControl('eventTypeId');
    }
  }

  protected removeHourlyEmployee(index: number) {
    this.hoursList.splice(index, 1);
    this.addedHourlyEmployees.splice(index, 1);
    this.orderHourlyEmployees.removeAt(index);
  }

  protected createOrder() {
    this.creating = true;
    const raw = this.createForm.getRawValue();
    this.createFixedOrders(raw)
  }

  protected createFixedOrders(raw: any) {
    this.service.createFixedOrders(this.addedFixedEmployees, raw)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        error: (err: Error) => {
          this.displayError(err.message);
        },
        complete: () => {
          this.completeFixedOrder();
          this.createHourlyOrders(raw);
        }
      });
  }

  protected createHourlyOrders(raw: any) {
    this.service.createHourlyOrders(this.addedHourlyEmployees, this.hoursList, raw)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        error: (err: Error) => {
          this.displayError(err.message);
        },
        complete: () => {
          this.completeHourlyOrder();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.eventtypeService.unsubscribe();
    this.jobService.unsubscribe();
    this.fixedEmployeeService.unsubscribe();
    this.hourlyEmployeeService.unsubscribe();
    this.service.unsubscribe();
  }
}
