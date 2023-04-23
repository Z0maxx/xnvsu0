import { Component, OnInit } from '@angular/core';
import { SignalrService } from './core/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private hubService: SignalrService) {}
  ngOnInit() {
    this.hubService.startConnection();
  }
  title = 'xnvsu0';
}
