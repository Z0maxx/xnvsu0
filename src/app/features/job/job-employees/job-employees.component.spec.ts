import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEmployeesComponent } from './job-employees.component';

describe('JobEmployeesComponent', () => {
  let component: JobEmployeesComponent;
  let fixture: ComponentFixture<JobEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
