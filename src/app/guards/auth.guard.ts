import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') ?? null;

  if (isLoggedIn !== 'true') {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
