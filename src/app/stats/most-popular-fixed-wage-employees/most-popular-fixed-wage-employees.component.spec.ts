import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularFixedWageEmployeesComponent } from './most-popular-fixed-wage-employees.component';

describe('MostPopularFixedWageEmployeesComponent', () => {
  let component: MostPopularFixedWageEmployeesComponent;
  let fixture: ComponentFixture<MostPopularFixedWageEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularFixedWageEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPopularFixedWageEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
