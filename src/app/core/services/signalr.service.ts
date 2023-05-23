import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SnackbarCallerService } from './snackbar-caller.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  constructor(private snackbarCaller: SnackbarCallerService) { }
  _hubConnection!: signalR.HubConnection;
  get hubConnection() {
    return this._hubConnection;
  }
  startConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:14784/api/hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

      this._hubConnection
        .start()
        .catch(() => {
          this.snackbarCaller.failure('There was an error while trying to connect to the SignalR Hub')
        })
        
  }
}
