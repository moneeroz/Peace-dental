import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { IRevenuCard } from '../interfaces/irevenu-card';
import { IChartData } from '../interfaces/ichart-data';
import { API_URL } from '../lib/constants';
import { ILatestInvoice } from '../interfaces/ilatest-invoice';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private baseUrl: string = `${API_URL}/revenue`;
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
    return this.http.get<IChartData[]>(`${this.baseUrl}/chart`, { params });
  }

  // latest invoices
  private latestInvoices$ = this.http.get<ILatestInvoice[]>(
    `${this.baseUrl}/invoices`,
  );
  private readonly latestInvoices = toSignal(this.latestInvoices$);

  getLatestInvoices(): Signal<ILatestInvoice[] | undefined> {
    return this.latestInvoices;
  }
}
