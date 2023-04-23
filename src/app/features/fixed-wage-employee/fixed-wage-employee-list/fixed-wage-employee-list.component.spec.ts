import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedWageEmployeeListComponent } from './fixed-wage-employee-list.component';

describe('FixedWageEmployeeListComponent', () => {
  let component: FixedWageEmployeeListComponent;
  let fixture: ComponentFixture<FixedWageEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedWageEmployeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedWageEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
