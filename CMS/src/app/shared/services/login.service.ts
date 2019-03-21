import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any = {
    firstName: "Michał",
    lastName: "Raźny"
  }

  constructor() { }

  isUserLogged() {
    return false;
  }
}
