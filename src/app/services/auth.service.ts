import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

export interface loginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUser = signal<Iuser | null | undefined>(undefined);
  // private loading = signal<boolean>(true);
  private baseUrl: string = 'http://localhost:3030/api/auth';
  private http = inject(HttpClient);

  readonly userSignal = this.currentUser.asReadonly();

  setCurrentUser(user: Iuser | null): void {
    this.currentUser.set(user);
  }

  login(data: loginData): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.baseUrl}/login`, data);
  }

  verifyToken(refreshToken: string): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.baseUrl}/token`, { refreshToken });
  }

  constructor() {}
}
