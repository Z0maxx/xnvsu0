import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeCreateComponent } from './hourly-wage-employee-create.component';

describe('HourlyWageEmployeeCreateComponent', () => {
  let component: HourlyWageEmployeeCreateComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
