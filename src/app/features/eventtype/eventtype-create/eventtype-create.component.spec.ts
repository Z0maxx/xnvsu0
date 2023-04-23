import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeCreateComponent } from './eventtype-create.component';

describe('EventtypeAddComponent', () => {
  let component: EventtypeCreateComponent;
  let fixture: ComponentFixture<EventtypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventtypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
