import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeSingleComponent } from './hourly-wage-employee-single.component';

describe('HourlyWageEmployeeSingleComponent', () => {
  let component: HourlyWageEmployeeSingleComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
