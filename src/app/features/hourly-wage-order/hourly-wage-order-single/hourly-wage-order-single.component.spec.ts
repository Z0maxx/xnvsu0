import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageOrderSingleComponent } from './hourly-wage-order-single.component';

describe('HourlyWageOrderSingleComponent', () => {
  let component: HourlyWageOrderSingleComponent;
  let fixture: ComponentFixture<HourlyWageOrderSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageOrderSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageOrderSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
