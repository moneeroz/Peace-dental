import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iinvoice } from '../interfaces/iinvoice';
import { IinvoiceInfo } from '../interfaces/iinvoice-info';
import { API_URL } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl: string = `${API_URL}/invoices`;
  private http = inject(HttpClient);

  addInvoice(data: IinvoiceInfo) {
    return this.http.post(`${this.baseUrl}/${data.patientId}`, data);
  }

  getInvoice(id: string) {
    return this.http.get<IinvoiceInfo>(`${this.baseUrl}/${id}`);
  }

  getInvoices(params: { page: number; query: string }) {
    return this.http.get<Iinvoice[]>(`${this.baseUrl}`, {
      params: { term: params.query, page: params.page },
    });
  }

  updateInvoice(data: IinvoiceInfo) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalPages(query: string) {
    query = query?.trim() || '';
    return this.http.get<number>(`${this.baseUrl}/count`, {
      params: { query },
    });
  }
}
