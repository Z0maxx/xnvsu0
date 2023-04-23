import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageOrderComponent } from './fixed-wage-order.component';

describe('FixedWageOrderComponent', () => {
  let component: FixedWageOrderComponent;
  let fixture: ComponentFixture<FixedWageOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
