import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageOrdersOverviewComponent } from './hourly-wage-orders-overview.component';

describe('HourlyWageOrdersOverviewComponent', () => {
  let component: HourlyWageOrdersOverviewComponent;
  let fixture: ComponentFixture<HourlyWageOrdersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageOrdersOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageOrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
