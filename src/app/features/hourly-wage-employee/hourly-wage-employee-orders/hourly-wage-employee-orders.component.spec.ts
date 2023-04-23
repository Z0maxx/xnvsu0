import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeOrdersComponent } from './hourly-wage-employee-orders.component';

describe('HourlyWageEmployeeOrdersComponent', () => {
  let component: HourlyWageEmployeeOrdersComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
