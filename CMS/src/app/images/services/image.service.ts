import { Injectable } from '@angular/core';
import { ImageResponseModel } from '../../shared/models/image/ImageResponse.model';
import { ImageListResponseModel } from '../../shared/models/image/ImageListResponse.model';
import { ImageModel } from '../../shared/models/image/Image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = environment.setting.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getAllImages() {
    return this.httpClient.get<ImageListResponseModel>(`${this.apiUrl}/image`);
  }

  addImage(imageData: ImageModel) {
    return this.httpClient.post<ImageResponseModel>(`${this.apiUrl}/image`, imageData);
  }

  getImageById(_id: string) {
    return this.httpClient.get<ImageResponseModel>(`${this.apiUrl}/image/${_id}`);
  }

  activateImage(_id: string) {
    return this.httpClient.post<ImageResponseModel>(`${this.apiUrl}/image/${_id}/activate`, {});
  }

  deactivateImage(_id: string) {
    return this.httpClient.post<ImageResponseModel>(`${this.apiUrl}/image/${_id}/deactivate`, {});
  }

  removeImage(_id: string) {
    return this.httpClient.delete(`${this.apiUrl}/image/${_id}`);
  }
}
