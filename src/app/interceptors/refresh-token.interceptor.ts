import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const handleAuthError = (err: HttpErrorResponse): Observable<any> => {
    if (err && err.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      authService.setCurrentUser(null);
      router.navigateByUrl('/login');
    } else if (err && err.status === 403) {
      const refreshToken = localStorage.getItem('refresh_token');

      return authService.verifyToken$(refreshToken ?? '').pipe(
        switchMap((user) => {
          if (!user) {
            router.navigateByUrl('/login');
            return of(err);
          }

          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role);
          authService.setCurrentUser(user);
          authService.setLogin(true);

          // Clone the request with the new token
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          // Resend the cloned request
          return next(clonedReq);
        }),
        catchError((verifyErr) => {
          router.navigateByUrl('/login');
          return of(verifyErr);
        }),
      );
    }

    return of(err);
  };

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => handleAuthError(err)),
  );
};
