import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeSingleComponent } from './eventtype-single.component';

describe('EventtypeSingleComponent', () => {
  let component: EventtypeSingleComponent;
  let fixture: ComponentFixture<EventtypeSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtypeSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventtypeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
