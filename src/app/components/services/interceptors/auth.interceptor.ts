import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            // Clone the request and add the token to the headers
            const authRequest = request.clone({
                setHeaders: { 'x-auth-token': token }
            });
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }
}