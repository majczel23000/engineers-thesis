export interface FaqModel {
  code: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  elements?: [{
    question: string;
    answear: string;
  }];
  status?: string;
}
