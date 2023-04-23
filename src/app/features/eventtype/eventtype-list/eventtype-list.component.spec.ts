import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeListComponent } from './eventtype-list.component';

describe('EventtypeListComponent', () => {
  let component: EventtypeListComponent;
  let fixture: ComponentFixture<EventtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
