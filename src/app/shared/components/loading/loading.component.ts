import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(public loadingService : LoadingService) {}

  @Input() creating = false;
  @Input() updating = false;
  @Input() deleting = false;
}
