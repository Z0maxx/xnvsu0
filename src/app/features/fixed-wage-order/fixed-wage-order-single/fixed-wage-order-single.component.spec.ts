import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageOrderSingleComponent } from './fixed-wage-order-single.component';

describe('FixedWageOrderSingleComponent', () => {
  let component: FixedWageOrderSingleComponent;
  let fixture: ComponentFixture<FixedWageOrderSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageOrderSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageOrderSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
