import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageOrderListComponent } from './hourly-wage-order-list.component';

describe('HourlyWageOrderListComponent', () => {
  let component: HourlyWageOrderListComponent;
  let fixture: ComponentFixture<HourlyWageOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
