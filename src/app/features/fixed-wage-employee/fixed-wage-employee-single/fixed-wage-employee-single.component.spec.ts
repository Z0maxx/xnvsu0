import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeSingleComponent } from './fixed-wage-employee-single.component';

describe('FixedWageEmployeeSingleComponent', () => {
  let component: FixedWageEmployeeSingleComponent;
  let fixture: ComponentFixture<FixedWageEmployeeSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
