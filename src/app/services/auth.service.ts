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
        this.setCurrentUser(user);
        this.setLogin(true);
        localStorage.setItem('token', user.token);
        localStorage.setItem('refresh_token', user.refreshToken);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', user.role);
        localStorage.setItem('id', user.id);
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

  // Logout
  logout(id: string) {
    return this.http.get(`${this.baseUrl}/logout/${id}`).pipe(
      map(() => {
        this.setCurrentUser(null);
        this.setLogin(false);
        localStorage.clear();
      }),
    );
  }
}
