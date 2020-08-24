import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
  })
export class FlightInterceptors implements HttpInterceptor {

    constructor(private userS : UserService){

    }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
        
        const skipIntercept = req.headers.has('skip');

        if (skipIntercept) {
            const h = req.clone({
                headers: req.headers.delete('skip')
            });
            req = h;
            return next.handle(req);
        }

        const head = req.clone({
            headers : req.headers.set(
                "Authorization" , this.userS.token
            ),
        });

        req = head;

        return next.handle(req);
    }
}