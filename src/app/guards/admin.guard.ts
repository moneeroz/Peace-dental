import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const router = inject(Router);
  if (role !== 'admin') {
    router.navigateByUrl('/home');
    return false;
  }
  return true;
};
