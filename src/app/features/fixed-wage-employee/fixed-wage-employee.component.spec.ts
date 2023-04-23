import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeComponent } from './fixed-wage-employee.component';

describe('FixedWageEmployeeComponent', () => {
  let component: FixedWageEmployeeComponent;
  let fixture: ComponentFixture<FixedWageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
