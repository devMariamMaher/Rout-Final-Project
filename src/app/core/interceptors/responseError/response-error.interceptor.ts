import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const responseErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService)

  if(!req.url.includes('signin') && !req.url.includes('signup')){
    return next(req).pipe(
      catchError((err)=>{
        _ToastrService.error(err.error.message, '', {
          timeOut: 2000,
          positionClass: 'toastPosition'
        });

        return throwError(()=>{err});
      })
    );
  } else{
    return next(req)
  }
};
