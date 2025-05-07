import { CanActivateFn } from '@angular/router';

export const authorizationionGuard: CanActivateFn = (route, state) => {
  return true;
};
