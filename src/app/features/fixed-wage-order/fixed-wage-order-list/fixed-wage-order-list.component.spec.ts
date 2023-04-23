import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageOrderListComponent } from './fixed-wage-order-list.component';

describe('FixedWageOrderListComponent', () => {
  let component: FixedWageOrderListComponent;
  let fixture: ComponentFixture<FixedWageOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
