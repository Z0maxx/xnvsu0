import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeesAverageHoursComponent } from './hourly-wage-employees-average-hours.component';

describe('HourlyWageEmployeesAverageHoursComponent', () => {
  let component: HourlyWageEmployeesAverageHoursComponent;
  let fixture: ComponentFixture<HourlyWageEmployeesAverageHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeesAverageHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeesAverageHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
