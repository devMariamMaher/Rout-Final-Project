import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)

  if(sessionStorage.getItem('token')){
    return true;
  } else{
    _Router.navigate(['/login']);
    return false;
  }
};
