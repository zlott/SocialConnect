import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service'; // Adjust the import path as necessary

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the interceptor only for specific URLs
    if (req.url.includes('reqres.in/api/')) {
      const token = this.authService.getUsersApiToken();
      const cloned = req.clone({
        headers: req.headers.set('x-api-key', `${token}`)
      });
      return next.handle(cloned);
    }

    // Pass through the request without modification for other URLs
    return next.handle(req);
  }
}