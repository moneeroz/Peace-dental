import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRevenuCard } from '../interfaces/irevenu-card';
import { IChartData } from '../interfaces/ichart-data';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private baseUrl: string = 'https://peace-be.onrender.com/api/revenue';
  private http = inject(HttpClient);

  // card data
  getCardData(params?: {
    year?: number | string;
    month?: number | string;
    doctorId?: string;
  }) {
    const newParams = {
      year: params?.year || '',
      month: params?.month || '',
      doctorId: params?.doctorId || '',
    };

    return this.http.get<IRevenuCard>(`${this.baseUrl}/card`, {
      params: newParams,
    });
  }

  // chart data
  GetChartData(params?: { year: number | string }) {
    return this.http.get<IChartData[]>(`${this.baseUrl}/year`, { params });
  }
}
