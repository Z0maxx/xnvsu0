import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeCreateComponent } from './fixed-wage-employee-create.component';

describe('FixedWageEmployeeCreateComponent', () => {
  let component: FixedWageEmployeeCreateComponent;
  let fixture: ComponentFixture<FixedWageEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
