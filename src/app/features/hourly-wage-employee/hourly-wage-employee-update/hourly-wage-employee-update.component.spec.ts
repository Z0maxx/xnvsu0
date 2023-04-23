import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeUpdateComponent } from './hourly-wage-employee-update.component';

describe('HourlyWageEmployeeUpdateComponent', () => {
  let component: HourlyWageEmployeeUpdateComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
