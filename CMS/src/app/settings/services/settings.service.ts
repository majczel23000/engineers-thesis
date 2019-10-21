import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SettingsListResponseModel } from 'src/app/shared/models/settings/SettingsListResponse.model';
import { SettingResponseModel } from 'src/app/shared/models/settings/SettingResponse.model';
import { SettingModel } from 'src/app/shared/models/settings/Setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  apiUrl = environment.setting.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllSettings() {
    return this.httpClient.get<SettingsListResponseModel>(`${this.apiUrl}/settings`);
  }

  getSettingById(_id: string) {
    return this.httpClient.get<SettingResponseModel>(`${this.apiUrl}/settings/${_id}`);
  }

  updateSetting(_id: string, body) {
    return this.httpClient.put<SettingResponseModel>(`${this.apiUrl}/settings/${_id}`, body);
  }

  activateSetting(_id: string) {
    return this.httpClient.post<SettingResponseModel>(`${this.apiUrl}/settings/${_id}/activate`, {});
  }

  deactivateSetting(_id: string) {
    return this.httpClient.post<SettingResponseModel>(`${this.apiUrl}/settings/${_id}/deactivate`, {});
  }

  addSetting(body: SettingModel) {
    return this.httpClient.post<SettingResponseModel>(`${this.apiUrl}/settings`, body);
  }

  removeSetting(_id: string) {
    return this.httpClient.delete(`${this.apiUrl}/settings/${_id}`);
  }

}
