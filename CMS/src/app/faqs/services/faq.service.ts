import { Injectable } from '@angular/core';
import { FaqResponseModel } from '../../shared/models/faq/FaqResponse.model';
import { FaqListResponseModel} from '../../shared/models/faq/FaqListResponse.model';
import { FaqModel } from '../../shared/models/faq/Faq.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModuleNavigationModel } from '../../shared/models/module-navigation/moduleNavigation.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  apiUrl = environment.setting.apiUrl;

  faqsNavigation: ModuleNavigationModel = {
    items: [
      {
        label: 'Faqs list',
        routerLink: '/faqs'
      },
      {
        label: 'Add new faq',
        routerLink: '/faqs/add'
      }
    ]
  };

  constructor(private httpClient: HttpClient) { }

  getAllFaqs() {
    return this.httpClient.get<FaqListResponseModel>(`${this.apiUrl}/faq`);
  }

  addFaq(faqData: FaqModel) {
    return this.httpClient.post<FaqResponseModel>(`${this.apiUrl}/faq`, faqData);
  }

  getFaqById(_id: string) {
    return this.httpClient.get<FaqResponseModel>(`${this.apiUrl}/faq/${_id}`);
  }

  activateFaq(_id: string) {
    return this.httpClient.post<FaqResponseModel>(`${this.apiUrl}/faq/${_id}/activate`, {});
  }

  deactivateFaq(_id: string) {
    return this.httpClient.post<FaqResponseModel>(`${this.apiUrl}/faq/${_id}/deactivate`, {});
  }

  removeFaq(_id: string) {
    return this.httpClient.delete(`${this.apiUrl}/faq/${_id}`);
  }

  editFaq(_id: string, faqData) {
    return this.httpClient.put<FaqResponseModel>(`${this.apiUrl}/faq/${_id}`, faqData);
  }

  getFaqsNavigation(): ModuleNavigationModel {
    return this.faqsNavigation;
  }
}
