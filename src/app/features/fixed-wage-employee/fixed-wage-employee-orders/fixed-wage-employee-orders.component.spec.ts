import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeOrdersComponent } from './fixed-wage-employee-orders.component';

describe('FixedWageEmployeeOrdersComponent', () => {
  let component: FixedWageEmployeeOrdersComponent;
  let fixture: ComponentFixture<FixedWageEmployeeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
