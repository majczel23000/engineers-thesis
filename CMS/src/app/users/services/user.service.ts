import { Injectable } from '@angular/core';
import { UserListModel } from 'src/app/shared/models/UserList.model';
import { User } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddUserModel } from '../../shared/models/AddUser.model';
import { UserResponseModel } from '../../shared/models/UserResponse.model';
import { RoleListResponseModel } from '../../shared/models/RoleListResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.setting.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserListModel>(`${this.apiUrl}/users`);
  }

  addUser(userData: User) {
    return this.httpClient.post<AddUserModel>(`${this.apiUrl}/users`, userData);
  }

  getUserById(_id: string) {
    return this.httpClient.get<UserResponseModel>(`${this.apiUrl}/users/${_id}`);
  }

  updateUser(_id: string, body) {
    return this.httpClient.put<UserResponseModel>(`${this.apiUrl}/users/${_id}`, body);
  }

  getAllRoles() {
    return this.httpClient.get<RoleListResponseModel>(`${this.apiUrl}/roles`);
  }
}
