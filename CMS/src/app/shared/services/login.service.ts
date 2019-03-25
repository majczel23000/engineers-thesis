import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginData } from '../models/userLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any = {
    firstName: "Michał",
    lastName: "Raźny"
  }

  constructor(private http: HttpClient) { }

  isUserLogged() {
    return false;
  }

  loginUser(userData: UserLoginData) {
    return this.http.post('http://localhost:3000/users/login', userData);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
