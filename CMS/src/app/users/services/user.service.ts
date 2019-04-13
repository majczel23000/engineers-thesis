import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserListModel } from 'src/app/shared/models/UserList.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.setting.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<UserListModel>(`${this.apiUrl}/users`);
  }
}
