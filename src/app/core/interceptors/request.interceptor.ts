import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  get sentCount() {
    return this.#sentCount;
  }

  #sentCount = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.responseType != 'text') {
      this.#sentCount++;
    }
    const newRequest = request.clone({reportProgress: true});
    return next.handle(newRequest).pipe(
      map(event => {
        if (request.responseType != 'text') {
          if (event.type == HttpEventType.ResponseHeader && event.status == 200 || event.type == HttpEventType.Sent) {
            this.loadingService.loading = true;
          }

          if (event.type == HttpEventType.DownloadProgress && event.total) {
            const value = event.loaded / event.total;
            this.loadingService.value = value * 100;
          }

          if (event.type == HttpEventType.Response || event.type == HttpEventType.ResponseHeader && event.status != 200) {
            this.#sentCount--;
            if (this.#sentCount == 0) {
              setTimeout(() => {
                this.loadingService.loading = false;
              }, 400);
            }
          }
        }
        return event;
      })
    ) as Observable<HttpEvent<unknown>>;
  }
}
