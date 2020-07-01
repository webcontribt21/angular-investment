import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheControlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (/^https:\/\/openiban.****\-internal\.com/i.test(req.url)) {
      return next.handle(req);
    }
    const httpRequest = req.clone({
      headers: req.headers.append('Cache-Control', 'no-cache'),
    });

    return next.handle(httpRequest);
  }
}
