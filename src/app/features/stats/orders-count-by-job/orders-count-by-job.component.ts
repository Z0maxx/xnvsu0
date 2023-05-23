import { Component, Input } from '@angular/core';
import { OrdersCount } from 'src/app/shared/models/stat-models/orders-count';

@Component({
  selector: 'app-orders-count-by-job',
  templateUrl: './orders-count-by-job.component.html',
  styleUrls: ['./orders-count-by-job.component.css']
})
export class OrdersCountByJobComponent {
  @Input() ordersCount!: OrdersCount;

  displayedColumns = ['fixedOrderCount', 'hourlyOrderCount', 'overallCount'];
}
