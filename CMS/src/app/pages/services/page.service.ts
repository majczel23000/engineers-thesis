import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PageModel } from '../../shared/models/page/Page.model';
import { PageResponseModel } from '../../shared/models/page/PageResponse.model';
import { PageListResponseModel } from '../../shared/models/page/PageListResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  apiUrl = environment.setting.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPages() {
    return this.httpClient.get<PageListResponseModel>(`${this.apiUrl}/page`);
  }

  addPage(pageData: PageModel) {
    return this.httpClient.post<PageResponseModel>(`${this.apiUrl}/page`, pageData);
  }

  getPageById(_id: string) {
    return this.httpClient.get<PageResponseModel>(`${this.apiUrl}/page/${_id}`);
  }

  activatePage(_id: string) {
    return this.httpClient.post<PageResponseModel>(`${this.apiUrl}/page/${_id}/activate`, {});
  }

  deactivatePage(_id: string) {
    return this.httpClient.post<PageResponseModel>(`${this.apiUrl}/page/${_id}/deactivate`, {});
  }

  removePage(_id: string) {
    return this.httpClient.delete(`${this.apiUrl}/page/${_id}`);
  }

  editPage(_id: string, pageData: PageModel) {
    return this.httpClient.put<PageResponseModel>(`${this.apiUrl}/page/${_id}`, pageData);
  }
}
