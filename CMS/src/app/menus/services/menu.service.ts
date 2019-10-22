import { Injectable } from '@angular/core';
import { MenuResponseModel } from '../../shared/models/menu/MenuResponse.model';
import { MenuListResponseModel } from '../../shared/models/menu/MenuListResponse.model';
import { MenuModel } from '../../shared/models/menu/Menu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModuleNavigationModel } from '../../shared/models/module-navigation/moduleNavigation.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiUrl = environment.setting.apiUrl;

  menusNavigation: ModuleNavigationModel = {
    items: [
      {
        label: 'Menus list',
        routerLink: '/menus'
      },
      {
        label: 'Add new menu',
        routerLink: '/menus/add'
      }
    ]
  }

  constructor(private httpClient: HttpClient) { }

  getAllMenus() {
    return this.httpClient.get<MenuListResponseModel>(`${this.apiUrl}/menu`);
  }

  addMenu(menuData: MenuModel) {
    return this.httpClient.post<MenuResponseModel>(`${this.apiUrl}/menu`, menuData);
  }

  getMenuById(_id: string) {
    return this.httpClient.get<MenuResponseModel>(`${this.apiUrl}/menu/${_id}`);
  }

  activateMenu(_id: string) {
    return this.httpClient.post<MenuResponseModel>(`${this.apiUrl}/menu/${_id}/activate`, {});
  }

  deactivateMenu(_id: string) {
    return this.httpClient.post<MenuResponseModel>(`${this.apiUrl}/menu/${_id}/deactivate`, {});
  }

  removeMenu(_id: string) {
    return this.httpClient.delete(`${this.apiUrl}/menu/${_id}`);
  }

  editMenu(_id: string, menuData) {
    return this.httpClient.put<MenuResponseModel>(`${this.apiUrl}/menu/${_id}`, menuData);
  }

  getMenusNavigation(): ModuleNavigationModel {
    return this.menusNavigation;
  }
}
