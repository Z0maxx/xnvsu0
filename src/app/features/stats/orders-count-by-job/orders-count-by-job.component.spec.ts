import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCountByJobComponent } from './orders-count-by-job.component';

describe('OrdersCountByJobComponent', () => {
  let component: OrdersCountByJobComponent;
  let fixture: ComponentFixture<OrdersCountByJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersCountByJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersCountByJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
