import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { map, Observable } from 'rxjs';
import { API_URL } from '../lib/utils';

export interface loginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${API_URL}/auth`;
  private http = inject(HttpClient);

  // Current user
  private readonly currentUser = signal<Iuser | null | undefined>(undefined);
  readonly userSignal = this.currentUser.asReadonly();

  setCurrentUser(user: Iuser | null): void {
    this.currentUser.set(user);
  }

  private loginStatus = signal<boolean>(false);
  readonly isLoggedIn = this.loginStatus.asReadonly();

  setLogin(status: boolean): void {
    this.loginStatus.set(status);
  }

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
      .post<Iuser>(`${this.baseUrl}/token`, { refreshToken })
      .pipe(
        map((user) => {
          this.setCurrentUser(user);
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
