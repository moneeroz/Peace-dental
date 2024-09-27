import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withComponentInputBinding,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { delay, retry } from 'rxjs';
import { authInterceptor } from './interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export function initiliazeApp(authService: AuthService, router: Router) {
  const refresh_token = localStorage.getItem('refresh_token');

  return () => {
    if (!refresh_token) {
      authService.setCurrentUser(null);
      authService.setLogin(false);
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      router.navigateByUrl('/home');
      return;
    }

    authService
      .verifyToken$(refresh_token)
      // .pipe(retry(2), delay(300))
      .subscribe({
        next: (user) => {
          authService.setCurrentUser(user);
          authService.setLogin(true);
          localStorage.setItem('token', user.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', user.role);
        },
        error: (err) => {
          console.error(err);
          authService.setCurrentUser(null);
          authService.setLogin(false);
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('role');
          localStorage.removeItem('token');
          router.navigateByUrl('/login');
        },
      });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor, refreshTokenInterceptor]),
    ),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initiliazeApp,
      deps: [AuthService, Router],
      multi: true,
    },
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ),
  ],
};
