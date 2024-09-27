import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') ?? null;

  if (isLoggedIn === 'true') {
    router.navigateByUrl('/overview');
    return false;
  }
  return true;
};
