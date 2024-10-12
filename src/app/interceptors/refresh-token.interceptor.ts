import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../lib/constants';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const handleAuthError = (err: HttpErrorResponse): Observable<any> => {
    if (err && err.status === 401) {
      const token = authService.getToken(TOKEN_KEY);

      if (!token) {
        authService.removeToken(TOKEN_KEY);
        authService.removeToken(REFRESH_TOKEN_KEY);
        router.navigateByUrl('/login');
      } else {
        const refreshToken = authService.getToken(REFRESH_TOKEN_KEY);

        return authService.verifyToken$(refreshToken ?? '').pipe(
          switchMap((user) => {
            if (!user) {
              authService.removeToken(TOKEN_KEY);
              authService.removeToken(REFRESH_TOKEN_KEY);
              router.navigateByUrl('/login');
              return of(err);
            }

            authService.setToken(TOKEN_KEY, user.token);
            authService.setToken(REFRESH_TOKEN_KEY, user.refreshToken);

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
            return of(verifyErr);
          }),
        );
      }
    } else if (err && err.status === 403) {
      authService.removeToken(TOKEN_KEY);
      authService.removeToken(REFRESH_TOKEN_KEY);
      router.navigateByUrl('/login');
    }

    return of(err);
  };

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => handleAuthError(err)),
  );
};
