import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading.service';
import { AppConfigService } from '../utils/app-config.service';
// import { LoadingService } from '../services/loading.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {


  constructor(
    private _loading: LoadingService,
    private toastr: ToastrService,
    public appConfig: AppConfigService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const clone = request.clone({
      // Overwriting
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization': request.url.includes('/api/chat/') ? 'Bearer ' + this.appConfig.getLocalStorage('Proctor_token') : 'Bearer aqSkKT6qguVyANMPtR6qqWaiCLUTRNpS7aki0COQm6WEg9WE8VWiopu9rF5oQank2AdWyM3UKr62WUu9l1R1BfaO9CzM16Vi89ecAX6ADPfhGBzpAEXze1do0SqtMkdQ5oGqFqtXphoc4DZL4hb6wRdg09RWzEJcnYJLtvska9HfvQiywtu1LZvDt1AD104ypzLaIRV6dGtKWHrhYgxVn7D3Q9mkTS3oejbVX8z81RwN3Ely6g59t5RRU88BVJiv'
      })
      // Without overwriting
      // headers: request.headers.set('Content-Type', 'application/json'),
      // .set('header2', 'header 2 value')
      // .set('header3', 'header 3 value')
    });
    if (request.reportProgress) {
    } else {
      this._loading.setLoading(true, request.url);
    }

    return next.handle(clone).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
                this._loading.setLoading(false, request.url);
        }
        return event;
      }),
      retry(3),
      // return next.handle(request).pipe(
      //   map((event: HttpEvent<any>) => {
      //     if (!request.headers.has('Content-Type')) {
      //       // request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });
      //       request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      //     }

      //     if (event instanceof HttpResponse) {
      //       // this.appConfig.hideLoader();
      //       return event;
      //     }
      //     // this.appConfig.hideLoader();
      //     return event;
      //   }),
      //   retry(3),
      catchError((error: HttpErrorResponse) => {
        this._loading.setLoading(false, request.url);
          if (error && error['status'] !== 200) {
          console.log(error ? error : '');
        }

        if (error.status === 0) {
          this.toastr.error('Your network connection is down or Request is getting timed out.', 'Please try again later..');
          return throwError(error);
        }
        
        if (error.status === 400) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '400 Bad Request');
          return throwError(error);
        }

        if (error.status === 401) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '401 Unauthorized');
          return throwError(error);
        }

        if (error.status === 403) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '403 Forbidden');
            return throwError(error);
        }

        if (error.status === 422) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '422 Unprocessable entity');
          return throwError(error);
        }

        if (error.status === 500) {
          this.toastr.error('Server Error', 'Please try again later');
          return throwError(error);
        }

        if (error.status === 404) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '404 No data found');
          return throwError(error);
        }

        if (error.status === 409) {
          this.toastr.error(error.error && error.error.res ? error.error.res : '409 Conflict error');
          return throwError(error);
        }

        if (error.status === 200) {
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
