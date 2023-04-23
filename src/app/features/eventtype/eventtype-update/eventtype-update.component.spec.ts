import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeUpdateComponent } from './eventtype-update.component';

describe('EventtypeUpdateComponent', () => {
  let component: EventtypeUpdateComponent;
  let fixture: ComponentFixture<EventtypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtypeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventtypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
