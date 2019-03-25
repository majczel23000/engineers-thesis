import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next){
    let loginService = this.injector.get(LoginService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}