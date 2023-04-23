import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageOrderComponent } from './hourly-wage-order.component';

describe('HourlyWageOrderComponent', () => {
  let component: HourlyWageOrderComponent;
  let fixture: ComponentFixture<HourlyWageOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
