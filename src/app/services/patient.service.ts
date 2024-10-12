import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ipatient } from '../interfaces/ipatient';
import { IpatientInfo } from '../interfaces/ipatient-info';
import { API_URL } from '../lib/constants';

export interface IpatientInvoices {
  id: string;
  patientName: string;
  doctorName: string;
  amount: number;
  date: string;
  reason: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl: string = `${API_URL}/patients`;
  private http = inject(HttpClient);

  addPatient(data: IpatientInfo) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getPatient(id: string) {
    return this.http.get<IpatientInfo>(`${this.baseUrl}/${id}`);
  }

  getPatients(params: { page: number; query: string }) {
    return this.http.get<Ipatient[]>(`${this.baseUrl}`, {
      params: { term: params.query, page: params.page },
    });
  }

  getAllPatients() {
    return this.http.get<IpatientInfo[]>(`${this.baseUrl}/all`);
  }

  updatePatient(data: IpatientInfo) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getPatientInvoices(id: string) {
    return this.http.get<IpatientInvoices[]>(`${this.baseUrl}/invoices/${id}`);
  }

  getTotalPages(query: string) {
    query = query?.trim() || '';
    return this.http.get<number>(`${this.baseUrl}/count`, {
      params: { query },
    });
  }
}
