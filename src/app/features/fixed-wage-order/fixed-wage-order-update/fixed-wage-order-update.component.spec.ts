import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageOrderUpdateComponent } from './fixed-wage-order-update.component';

describe('FixedWageOrderUpdateComponent', () => {
  let component: FixedWageOrderUpdateComponent;
  let fixture: ComponentFixture<FixedWageOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageOrderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
