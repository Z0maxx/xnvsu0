import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageEmployeeListComponent } from './hourly-wage-employee-list.component';

describe('HourlyWageEmployeeListComponent', () => {
  let component: HourlyWageEmployeeListComponent;
  let fixture: ComponentFixture<HourlyWageEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageEmployeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
