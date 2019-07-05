import { Injectable } from '@angular/core';
import { FaqResponseModel } from '../../shared/models/faq/FaqResponse.model';
import { FaqListResponseModel} from '../../shared/models/faq/FaqListResponse.model';
import { FaqModel } from '../../shared/models/faq/Faq.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  apiUrl = environment.setting.apiUrl;

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
}
