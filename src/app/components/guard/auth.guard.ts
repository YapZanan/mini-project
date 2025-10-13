import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { isSessionAvailable } from '../../services/utils/storage.utils';

export const authGuard = (): boolean | UrlTree => {
  const router = inject(Router);
  const hasSession = isSessionAvailable();

  if (hasSession) {
    const user = sessionStorage.getItem('user');
    if (user) {
      return true;
    }
  }
  return router.createUrlTree(['/login']);
};
