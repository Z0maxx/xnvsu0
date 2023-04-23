import { Component, Input } from '@angular/core';
import { Overview } from 'src/app/shared/models/stat-models/overview';

@Component({
  selector: 'app-overall-overview',
  templateUrl: './overall-overview.component.html',
  styleUrls: ['./overall-overview.component.css']
})
export class OverallOverviewComponent {
  @Input() overview!: Overview 
}
