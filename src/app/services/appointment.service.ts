import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iappointment } from '../interfaces/iappointment';
import { IappointmentInfo } from '../interfaces/iappointment-info';
import { API_URL } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl: string = `${API_URL}/appointments`;
  private http = inject(HttpClient);

  addAppointment(data: IappointmentInfo) {
    return this.http.post(`${this.baseUrl}/${data.patientId}`, data);
  }

  getAppointment(id: string) {
    return this.http.get<IappointmentInfo>(`${this.baseUrl}/${id}`);
  }

  getAppointments(params: { page: number; query: string }) {
    return this.http.get<Iappointment[]>(`${this.baseUrl}`, {
      params: { term: params.query, page: params.page },
    });
  }

  updateAppointment(data: IappointmentInfo, id: string) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalPages(query: string) {
    query = query?.trim() || '';
    return this.http.get<number>(`${this.baseUrl}/count`, {
      params: { query },
    });
  }
}
