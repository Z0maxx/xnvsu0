import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeComponent } from './hourly-wage-employee.component';

describe('HourlyWageEmployeeComponent', () => {
  let component: HourlyWageEmployeeComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
