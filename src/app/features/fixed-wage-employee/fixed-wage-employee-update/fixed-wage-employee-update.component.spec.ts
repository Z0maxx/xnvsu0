import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeUpdateComponent } from './fixed-wage-employee-update.component';

describe('FixedWageEmployeeUpdateComponent', () => {
  let component: FixedWageEmployeeUpdateComponent;
  let fixture: ComponentFixture<FixedWageEmployeeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
