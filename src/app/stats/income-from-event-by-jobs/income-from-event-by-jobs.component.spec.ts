import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeFromEventByJobsComponent } from './income-from-event-by-jobs.component';

describe('IncomeFromEventByJobsComponent', () => {
  let component: IncomeFromEventByJobsComponent;
  let fixture: ComponentFixture<IncomeFromEventByJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeFromEventByJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeFromEventByJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
