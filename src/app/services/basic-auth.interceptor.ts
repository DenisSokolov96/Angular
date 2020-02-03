import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const authData = localStorage.getItem('authData');
    console.log('INTERCEPTOR_START auth data - ' + authData);
    if (authData != null ) {

      const urlSplit = request.urlWithParams.split('/');

      console.log('INTERCEPTOR_METHOD - ' + request.method + ' ' + urlSplit + ' ' + urlSplit[urlSplit.length - 1]);
      if (urlSplit[urlSplit.length - 1] === 'registration') {
        console.log('CALL_REG');
        return next.handle(request);
      }
      if ( (urlSplit[urlSplit.length - 1] === 'free') && (urlSplit[urlSplit.length - 2] === 'show') ) {
        console.log('CALL_box_show_free');
        return next.handle(request);
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authData}`
        }
      });
    }

    console.log('INTERCEPTOR_END');
    return next.handle(request);
  }
}
