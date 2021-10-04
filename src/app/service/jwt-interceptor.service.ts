import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{ //http esemenyt ad vissza mint obs, elkap egy req. mókol vele és meghivja a next metodust

    const req = request.clone({
      setHeaders: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    return next.handle(req);
  }
}
