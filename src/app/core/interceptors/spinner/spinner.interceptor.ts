import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);
  const _PLATFORM_ID = inject(PLATFORM_ID)

  if(isPlatformBrowser(_PLATFORM_ID)){
    if(sessionStorage.getItem('token') != null){
      _NgxSpinnerService.show();
    }
  }

  return next(req).pipe(finalize(()=>{_NgxSpinnerService.hide()}));
};
