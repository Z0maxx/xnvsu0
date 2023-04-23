import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWageOrderUpdateComponent } from './hourly-wage-order-update.component';

describe('HourlyWageOrderUpdateComponent', () => {
  let component: HourlyWageOrderUpdateComponent;
  let fixture: ComponentFixture<HourlyWageOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWageOrderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWageOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
