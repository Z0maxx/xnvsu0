import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarCallerService {
  constructor(private snackbar: MatSnackBar) { }

  failure(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, { data: { message: message, type: 'failure' } });
  }

  success(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, { data: { message: message, type: 'success' } });
  }

  alert(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, { data: { message: message, type: 'alert' } });
  }
}
