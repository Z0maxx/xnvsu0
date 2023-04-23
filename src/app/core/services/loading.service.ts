import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }

  loading = false;
  value = 0;
}
