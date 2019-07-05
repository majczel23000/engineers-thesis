import { StatisticsModel } from './Statistics.model';


export interface StatisticsResponseModel {
  code: number;
  status: boolean;
  message: string;
  data: StatisticsModel;
}
