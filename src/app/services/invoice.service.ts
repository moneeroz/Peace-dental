import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iinvoice } from '../interfaces/iinvoice';
import { IinvoiceInfo } from '../interfaces/iinvoice-info';
import { API_URL } from '../lib/utils';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl: string = `${API_URL}/invoices`;
  private http = inject(HttpClient);

  addInvoice(data: IinvoiceInfo) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getInvoice(id: string) {
    return this.http.get<IinvoiceInfo>(`${this.baseUrl}/${id}`);
  }

  getInvoices(params: { page?: number; query: string }) {
    return this.http.get<Iinvoice[]>(`${this.baseUrl}`, { params: params });
  }

  updateInvoice(data: IinvoiceInfo) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalPages(query: string) {
    query = query?.trim() || '';
    return this.http.get<number>(`${this.baseUrl}/pages/count`, {
      params: { query },
    });
  }
}
