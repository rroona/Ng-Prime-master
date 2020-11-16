import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(attachment: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and attachment is to api url
        const currentUser = this.authenticationService.getcurrentUser;


        const isLoggedIn = currentUser && (currentUser.token!="");

        //const isApiUrl = attachment.url.startsWith(Configuration.jwtCreateUrl);
        if (isLoggedIn/* && isApiUrl*/) {
            attachment = attachment.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(attachment);
    }
}