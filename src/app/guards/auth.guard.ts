import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TOKEN_KEY } from '../lib/constants';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getToken(TOKEN_KEY);

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
