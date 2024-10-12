import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const role = authService.getClaims().role;
  if (role !== 'Admin') {
    router.navigateByUrl('/not-authorized');
    return false;
  }
  return true;
};
