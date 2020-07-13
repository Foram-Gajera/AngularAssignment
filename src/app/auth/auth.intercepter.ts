import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthIntercepter implements HttpInterceptor{

    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('Intercepter');
        const token = localStorage.getItem('token');
        // let newHeaders = req.headers;
        if (token){

            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        }

        // return next.handle(req);    ok... but
        // to print response in console  implement this
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }));

        // if (localStorage.getItem('token') != null){
        //     // default req is read only so we need to clone/copy req then add authorization hader - token
        //     const cloneReq = req.clone({
        //         headers: req.headers.set('Authorization' , 'Bearer' + localStorage.getItem('token'))
        //     });
        //     // to process new request
        //     return next.handle(cloneReq).pipe(
        //         tap(
        //             succ => {},
        //             err => {
        //                 if (err.status === 401){
        //                     localStorage.removeItem('token');
        //                     this.router.navigateByUrl('/src/app/login');
        //                 }
        //             }
        //         )
        //     );
        // }
        // else{
        //     return next.handle(req.clone());
        // }
    }
}
