import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { map, Observable } from 'rxjs';
import { API_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from '../lib/constants';
import { IClaims } from '../interfaces/iclaims';

export interface loginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${API_URL}/account`;
  private http = inject(HttpClient);

  // Login
  login(data: loginData): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.baseUrl}/login`, data).pipe(
      map((user) => {
        this.setToken(TOKEN_KEY, user.token);
        this.setToken(REFRESH_TOKEN_KEY, user.refreshToken);
        return user;
      }),
    );
  }

  // Token verification
  verifyToken$(refreshToken: string): Observable<Iuser> {
    return this.http
      .post<Iuser>(`${this.baseUrl}/verify-token`, { refreshToken })
      .pipe(
        map((user) => {
          this.setToken(TOKEN_KEY, user.token);
          this.setToken(REFRESH_TOKEN_KEY, user.refreshToken);
          return user;
        }),
      );
  }

  /// Logout
  logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  // Token
  getToken(key: string) {
    return localStorage.getItem(key);
  }

  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeToken(key: string) {
    localStorage.removeItem(key);
  }

  getClaims(): IClaims {
    const token = this.getToken(TOKEN_KEY);
    const claims = JSON.parse(window.atob(token!.split('.')[1]));
    return claims;
  }
}
