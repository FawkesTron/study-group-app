import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    // TODO: redirect to a hidden admin login page instead of the home page.
    return router.createUrlTree(['/']); // Redirect to the home page, '/login' page for now.
  }
};
