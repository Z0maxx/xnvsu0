import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeOrdersComponent } from './eventtype-orders.component';

describe('EventtypeDetailsComponent', () => {
  let component: EventtypeOrdersComponent;
  let fixture: ComponentFixture<EventtypeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtypeOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventtypeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
