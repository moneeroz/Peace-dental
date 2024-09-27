import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Idoctor } from '../interfaces/idoctor';
import { API_URL } from '../lib/utils';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl: string = `${API_URL}/doctors`;
  private http = inject(HttpClient);

  addDoctor(name: string) {
    return this.http.post(`${this.baseUrl}`, name);
  }

  getDoctor(id: string) {
    return this.http.get<Idoctor>(`${this.baseUrl}/${id}`);
  }

  getDoctors() {
    return this.http.get<Idoctor[]>(`${this.baseUrl}`);
  }

  updateDoctor(data: Idoctor) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
